import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the Waymesh Copilot, an AI travel intelligence assistant for boutique travel agencies. You help travel designers, agency owners, and DMCs with supplier recommendations, itinerary building, destination intelligence, contract summaries, and proposal drafting. You have access to the agency's private supplier network (312 suppliers, 89 preferred partners across 47 destinations), destination intelligence (89 destinations with safety, seasonality, and visa data), contract intelligence (47 active agreements with rates, terms, and allocations), proposal history (214 past itineraries), agency knowledge (124 internal documents, SOPs, playbooks), and partner network (47 DMCs, 93 local experts). When answering, always reference which knowledge domain your answer draws from. Format itineraries with clear day-by-day structure. Format supplier recommendations as structured cards with name, location, net rate, and commission. Every answer should feel like a senior travel advisor briefing, not a chatbot response. End answers that involve pricing with: "This quote requires your approval before sending to the client."`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const payload = JSON.stringify({ text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (err) {
          const payload = JSON.stringify({ error: String(err) });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
