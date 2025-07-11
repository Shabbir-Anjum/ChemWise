# AI Assistant Chat Application

A modern Next.js application that provides an interactive chat interface powered by Google's Gemini AI. Users can have conversations with an AI assistant through a clean, responsive web interface.

## Features

- 🤖 **AI-Powered Chat**: Integration with Google Gemini AI for intelligent conversations
- 💬 **Real-time Chat Interface**: Smooth, responsive chat experience
- 🎨 **Modern UI**: Clean design with Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js for optimal performance
- 🔒 **Secure API**: Server-side API routes for secure AI interactions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **Language**: TypeScript
- **Runtime**: Node.js

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- A Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-project-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   To get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key to your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── gemini/
│   │       └── route.ts          # API endpoint for Gemini integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main chat page
├── lib/
│   └── geminiClient.ts          # Gemini API client
├── components/                  # React components (if any)
├── public/                      # Static assets
├── .env.local                   # Environment variables (create this)
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## API Routes

### POST /api/gemini

Sends a message to the Gemini AI and returns the response.

**Request Body:**
```json
{
  "message": "Your message to the AI"
}
```

**Response:**
```json
{
  "response": "AI assistant's response"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## Usage

1. Open the application in your browser
2. Type your message in the chat input
3. Press Enter or click Send
4. Wait for the AI assistant's response
5. Continue the conversation naturally

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **Frontend Components**: Add new React components in the `components/` directory
2. **API Routes**: Create new API endpoints in the `app/api/` directory
3. **Styling**: Use Tailwind CSS classes or add custom styles in `globals.css`
4. **Utilities**: Add helper functions in the `lib/` directory

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS
- Google Cloud Platform

Make sure to set the `GEMINI_API_KEY` environment variable on your chosen platform.

## Troubleshooting

### Common Issues

**API Key Error**
- Ensure your `GEMINI_API_KEY` is correctly set in `.env.local`
- Verify the API key is valid and has proper permissions

**404 API Error**
- Check that the Gemini API endpoint is correct
- Ensure your API key has access to the Gemini API

**Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Check that all TypeScript types are properly defined

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Review the terminal output for server errors
3. Ensure all environment variables are properly set
4. Verify your API key is valid and active

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for providing the AI capabilities
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework