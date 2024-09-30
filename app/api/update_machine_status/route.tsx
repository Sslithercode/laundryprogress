// app/api/image-analysis/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { imageUrl } = await req.json(); // Expecting { imageUrl: '...' } in the request body
  const GROQ_API_KEY = process.env.GROQ_API_KEY; // Ensure you set this in your environment variables

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  const requestBody = {
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `The following is a photo of a washing machine with a number in green and another  big number in black respond using the following json
            {
              "eta": green_number,
              "machine_number": black_number,
            }
            `
            ,
          },
          {
            type: 'image_url',
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: '',
      },
    ],
    model: 'llama-3.2-11b-vision-preview',
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
    "response_format": {"type": "json_object"},
  };

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const upd  = data.choices[0].message.content;
    const machine_status = JSON.parse(upd);
    const res_new = await fetch(`${process.env.WASH_API_URL}/machines/${machine_status.machine_number}/start_wash`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          minutes: machine_status.eta,
        }),
      }
    )

    console.log(res_new);

    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing the request.' }, { status: 500 });
  }
}
