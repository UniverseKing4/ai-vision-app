# AI Vision

AI-powered image analysis for Android. Analyze images using state-of-the-art AI models.

## Features

- 🖼️ **Batch Image Analysis** - Process multiple images simultaneously
- 🤖 **Multiple AI Models** - OpenAI, Gemini Flash, Claude Fast, Kimi, Polly
- ✍️ **Custom Prompts** - Tailor analysis to your needs
- 🎨 **Material Design 3** - Modern UI with dark/light themes
- 🆓 **Free to Use** - No API key required (optional for unlimited usage)
- 📋 **Quick Copy** - One-tap clipboard export
- ⏱️ **Real-time Timer** - Track analysis duration
- 🛑 **Stop Analysis** - Cancel anytime
- 🔄 **State Preservation** - Resume after app restart
- 🔒 **Secure** - Encrypted API key storage

## Quick Start

### No Setup Required
1. Install the app
2. Select images from gallery
3. (Optional) Add a custom prompt
4. Tap **Analyze**

**Free tier:** 100 requests/hour, 1000/day

### Unlimited Usage
1. Get API key from [Pollinations AI](https://enter.pollinations.ai)
2. Tap settings icon (⚙️) in app
3. Enter your API key
4. Enjoy unlimited analysis

## Usage

**Analyze Images**
- Select single or multiple images
- Add optional custom prompts
- Tap Analyze (or Stop to cancel)
- Copy results with one tap

**Switch Models**
- Tap model icon in toolbar
- Choose your preferred AI model

**Toggle Theme**
- Tap theme icon for dark/light mode

## For Developers

### Tech Stack
- **Language:** Kotlin
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** 34 (Android 14)
- **Libraries:** Material Design 3, OkHttp, Coroutines, Markwon

### Build
```bash
./gradlew assembleDebug    # Debug build
./gradlew assembleRelease  # Release build
./gradlew installDebug     # Install on device
```

### Deploy Your Own Proxy
```bash
npm install -g wrangler
wrangler login
cd worker
echo "YOUR_API_KEY" | wrangler secret put POLLINATIONS_API_KEY
wrangler deploy
```

Update `PROXY_URL` in `MainActivity.kt` with your worker URL. See `worker/README.md` for details.

### CI/CD
GitHub Actions auto-builds, versions, and releases APKs on push to main.

## Security

- Encrypted API keys via Cloudflare Workers
- Rate limiting on default API
- HTTPS for all communications
- Secure local storage

## Permissions

- `INTERNET` - API calls
- `READ_MEDIA_IMAGES` - Gallery access (Android 13+)
- `READ_EXTERNAL_STORAGE` - Gallery access (Android 12 and below)

## License

Open source. Use, modify, and distribute freely.

## Credits

- **AI Provider:** [Pollinations AI](https://pollinations.ai)
- **Infrastructure:** Cloudflare Workers
- **UI:** Material Design 3
