# AI Vision

AI-powered image analysis for Android using multiple state-of-the-art models.

## Features

- 🖼️ **Batch Image Analysis** - Process multiple images simultaneously with parallel processing
- 🤖 **Multiple AI Models** - Choose from OpenAI, Gemini Flash, Claude Fast, Kimi, or Polly
- ✍️ **Custom Prompts** - Add your own prompts to tailor the analysis
- 🎨 **Material Design 3** - Modern, clean UI with dark/light theme support
- 📋 **Quick Copy** - One-tap copy results to clipboard
- ⏱️ **Real-time Timer** - Track analysis duration with live updates
- 🛑 **Stop Analysis** - Cancel ongoing analysis anytime
- 🔄 **State Preservation** - Resume analysis after app restart or configuration changes
- 🔒 **Secure API Proxy** - API keys encrypted via Cloudflare Workers

## Getting Started

### Option 1: Use Default API (No Setup)

The app works immediately without any configuration. Requests are routed through a secure Cloudflare Worker proxy.

**Rate Limits:**
- 100 requests per hour per IP
- 1,000 requests per day per IP

**How it works:**
1. Install the app
2. Select one or more images
3. (Optional) Add a custom prompt
4. Tap **Analyze**

### Option 2: Use Your Own API Key

Bring your own Pollinations API key to use your account's limits instead of the shared proxy.

**Setup:**
1. Get your API key from [Pollinations AI](https://enter.pollinations.ai)
2. Open the app and tap the **settings icon** (⚙️)
3. Enter your API key
4. Tap **Save**

**Note:** Your usage will be subject to your Pollinations account limits and balance. The app will display your account balance after each analysis.

## Usage

### Analyzing Images

1. Tap **"Select Image"** to choose from your gallery
2. Select single or multiple images (batch selection supported)
3. (Optional) Enter a custom prompt like "Describe in detail" or "What objects are visible?"
4. Tap **"Analyze"** to start
5. Tap **"Stop"** to cancel if needed
6. View results with markdown formatting
7. Tap the **copy icon** to copy results to clipboard

**Note:** Multiple images are processed in parallel for faster results. Each image result is clearly separated with headers.

### Switching Models

1. Tap the **model icon** in the toolbar
2. Choose from: OpenAI, Gemini Flash, Claude Fast, Kimi, or Polly
3. Selected model applies to all subsequent analyses

### Changing Theme

1. Tap the **theme icon** in the toolbar
2. Switches between light and dark mode
3. Preference is saved automatically

## Architecture

### How the Default API Works

```
Android App → Cloudflare Worker (Proxy) → Pollinations API
              ↑ Adds encrypted API key
              ↑ Enforces rate limits
```

The Cloudflare Worker acts as a secure proxy that:
- Stores the API key as an encrypted secret
- Adds authentication headers to requests
- Enforces rate limiting per IP address
- Never exposes the API key to clients

### How Custom API Keys Work

```
Android App → Pollinations API (Direct)
              ↑ Uses your API key
              ↑ Your account limits apply
```

When you provide your own API key:
- Requests go directly to Pollinations API
- Your account balance and limits apply
- App displays your balance after analysis
- No rate limiting from the proxy

## For Developers

### Tech Stack

- **Language:** Kotlin
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** 34 (Android 14)
- **Architecture:** Single Activity with coroutines for async operations
- **Key Libraries:**
  - Material Design 3 (UI components)
  - OkHttp (HTTP client)
  - Kotlin Coroutines (async/parallel processing)
  - Markwon (Markdown rendering)
  - ViewBinding (view access)

### Project Structure

```
app/src/main/
├── java/com/aivision/app/
│   ├── MainActivity.kt          # Main activity with all app logic
│   ├── AIVisionApp.kt          # Application class for theme persistence
│   └── ImagePagerAdapter.kt    # ViewPager adapter for multiple images
├── res/
│   ├── layout/                 # XML layouts
│   ├── drawable/               # Icons and graphics
│   ├── values/                 # Strings, colors, themes
│   └── menu/                   # Toolbar menu
└── AndroidManifest.xml

worker/
├── worker.js                   # Cloudflare Worker proxy with rate limiting
├── wrangler.toml              # Worker configuration
└── README.md                  # Detailed worker setup guide
```

### Build Commands

```bash
# Debug build
./gradlew assembleDebug

# Release build (signed)
./gradlew assembleRelease

# Install on connected device
./gradlew installDebug
```

### Deploy Your Own Proxy

To deploy your own Cloudflare Worker proxy:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Navigate to worker directory
cd worker

# Set your Pollinations API key as a secret
wrangler secret put POLLINATIONS_API_KEY
# (Paste your API key when prompted)

# Deploy the worker
wrangler deploy
```

After deployment, update `PROXY_URL` in `MainActivity.kt` with your worker URL:

```kotlin
private const val PROXY_URL = "https://your-worker.your-subdomain.workers.dev"
```

See `worker/README.md` for detailed instructions.

### CI/CD

GitHub Actions automatically:
- Builds release APK on push to main branch
- Auto-increments version tags
- Creates GitHub releases with APK artifacts
- Uploads build artifacts

Workflow file: `.github/workflows/build.yml`

## Security

- ✅ API keys stored as encrypted Cloudflare secrets (never in code)
- ✅ Keys never exposed in APK or network traffic
- ✅ Rate limiting prevents abuse of default proxy
- ✅ HTTPS for all API communications
- ✅ User API keys stored in secure SharedPreferences

## Rate Limiting (Default API Only)

| Limit Type | Value | Scope |
|------------|-------|-------|
| Hourly     | 100 requests | Per IP address |
| Daily      | 1,000 requests | Per IP address |

**Note:** Custom API keys bypass proxy rate limits but are subject to your Pollinations account limits.

## Permissions

- `INTERNET` - Required for API calls
- `READ_MEDIA_IMAGES` - Gallery access on Android 13+
- `READ_EXTERNAL_STORAGE` - Gallery access on Android 12 and below

## Cloudflare Worker Free Tier

The proxy runs on Cloudflare's free tier:
- 100,000 requests per day
- 10ms CPU time per request
- No credit card required
- No cold starts

## License

Open source. Use, modify, and distribute freely.

## Credits

- **AI Provider:** [Pollinations AI](https://pollinations.ai)
- **Proxy Infrastructure:** Cloudflare Workers
- **UI Framework:** Material Design 3
