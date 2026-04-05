export default {
  async fetch(request, env, ctx) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      
      // Rate limiting - 100 requests per hour per IP
      const hourlyKey = `rate_limit_hourly:${ip}:${Math.floor(Date.now() / 3600000)}`;
      const hourlyCount = await env.RATE_LIMIT?.get(hourlyKey) || 0;
      
      if (parseInt(hourlyCount) >= 100) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Maximum 100 requests per hour. Please use your own API key for unlimited access.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Daily limit - 1000 requests per day per IP
      const dailyKey = `rate_limit_daily:${ip}:${Math.floor(Date.now() / 86400000)}`;
      const dailyCount = await env.RATE_LIMIT?.get(dailyKey) || 0;
      
      if (parseInt(dailyCount) >= 1000) {
        return new Response(JSON.stringify({ 
          error: 'Daily limit exceeded. Maximum 1000 requests per day. Please use your own API key for unlimited access.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get request body
      const body = await request.json();

      // Forward to Pollinations API with your secret key
      const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.POLLINATIONS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.text();

      // Increment rate limit counters
      if (env.RATE_LIMIT) {
        ctx.waitUntil(
          Promise.all([
            env.RATE_LIMIT.put(hourlyKey, (parseInt(hourlyCount) + 1).toString(), { expirationTtl: 3600 }),
            env.RATE_LIMIT.put(dailyKey, (parseInt(dailyCount) + 1).toString(), { expirationTtl: 86400 })
          ])
        );
      }

      return new Response(data, {
        status: response.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }
  },
};
