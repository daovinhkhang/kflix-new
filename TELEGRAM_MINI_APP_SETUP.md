# KFLIX Telegram Mini App - Deployment Guide

## Bot Token Information
- **Bot Token**: `8367909351:AAHNcf72bwSvOXYx4C8_sG6ovAfq_Bv2aVg`
- **Domain**: `kflix.space`
- **Mini App URL**: `https://kflix.space`

## Step-by-Step Setup Guide

### 1. Deploy to kflix.space

First, make sure your application is deployed and accessible at `https://kflix.space`.

**Recommended deployment platforms:**
- Vercel (recommended for Next.js)
- Netlify
- Railway
- DigitalOcean App Platform

### 2. Configure Telegram Bot

#### A. Access BotFather
1. Open Telegram and search for `@BotFather`
2. Start a conversation with BotFather

#### B. Set Mini App URL
```
/setmenubutton
```
- Select your bot: `@your_bot_username`
- Send the Mini App URL: `https://kflix.space`
- Set button text: `🎬 Open KFLIX`

#### C. Set Bot Commands (Optional)
```
/setcommands
```
Select your bot and add these commands:
```
start - Launch KFLIX Mini App
help - Get help
movies - Browse movies
tv - Browse TV shows
search - Search content
```

#### D. Set Bot Description
```
/setdescription
```
Select your bot and set:
```
KFLIX - Your ultimate streaming destination! 🎬

Stream and discover movies, TV shows, and entertainment content. Access the latest releases and classic favorites right in Telegram.

Tap the menu button to launch the app!
```

#### E. Set Short Description
```
/setshortdescription
```
```
🎬 Stream movies & TV shows in Telegram
```

#### F. Set Bot Photo
Upload a profile picture (512x512 px recommended) using:
```
/setuserpic
```

### 3. Configure Mini App Settings

#### A. Set Web App URL
```
/newapp
```
- Select your bot
- Enter app name: `KFLIX`
- Enter description: `Stream movies and TV shows`
- Upload app icon (512x512 px)
- Set Web App URL: `https://kflix.space`

#### B. Set Domain
```
/setdomain
```
- Select your app
- Enter domain: `kflix.space`

### 4. Test the Mini App

1. Open your bot in Telegram
2. Tap the menu button or send `/start`
3. The KFLIX Mini App should open in Telegram's built-in browser
4. Test functionality:
   - Navigation works properly
   - Movies and TV shows load correctly
   - Search functionality works
   - Video playback works (if implemented)

### 5. Advanced Configuration (Optional)

#### A. Set Bot Menu Button
```javascript
// Using Telegram Bot API
const botToken = '8367909351:AAHNcf72bwSvOXYx4C8_sG6ovAfq_Bv2aVg';
const url = `https://api.telegram.org/bot${botToken}/setChatMenuButton`;

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    menu_button: {
      type: 'web_app',
      text: '🎬 Open KFLIX',
      web_app: {
        url: 'https://kflix.space'
      }
    }
  })
});
```

#### B. Bot Webhook Setup (if needed)
```javascript
// Set webhook URL
const webhookUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://kflix.space/api/telegram-webhook',
    allowed_updates: ['message', 'callback_query', 'web_app_data']
  })
});
```

### 6. Environment Variables

Make sure these environment variables are set in your deployment:

```env
TELEGRAM_BOT_TOKEN=8367909351:AAHNcf72bwSvOXYx4C8_sG6ovAfq_Bv2aVg
TELEGRAM_MINI_APP_URL=https://kflix.space
NEXT_PUBLIC_APP_URL=https://kflix.space
```

### 7. DNS Configuration

Ensure your domain `kflix.space` points to your hosting provider:

```
A     kflix.space          → [Your server IP]
CNAME www.kflix.space      → kflix.space
```

### 8. SSL Certificate

Make sure HTTPS is enabled for `kflix.space`. Most hosting providers offer free SSL certificates.

### 9. Testing Checklist

- [ ] Bot responds to `/start` command
- [ ] Menu button appears and works
- [ ] Mini App loads correctly in Telegram
- [ ] All navigation works
- [ ] Content loads properly
- [ ] No console errors
- [ ] Responsive design works on mobile
- [ ] Back button functionality works
- [ ] Telegram theme integration works

### 10. Troubleshooting

#### Common Issues:

**Mini App doesn't load:**
- Check if HTTPS is properly configured
- Verify domain is accessible
- Check CSP headers in next.config.ts

**Bot commands don't work:**
- Verify bot token is correct
- Check if webhook is properly configured
- Ensure bot is not in private mode

**Styling issues:**
- Check Telegram theme integration
- Verify viewport meta tags
- Test on different devices

**Performance issues:**
- Enable compression in next.config.ts
- Optimize images for mobile
- Use proper caching headers

### 11. Monitoring and Analytics

Consider adding:
- Google Analytics or similar for usage tracking
- Error monitoring (Sentry, LogRocket)
- Performance monitoring
- User feedback system

### 12. Bot Commands Implementation

Create these endpoints in your Next.js app:

```typescript
// pages/api/telegram-webhook.ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;
  
  if (message?.text === '/start') {
    // Send welcome message with Mini App button
    // Implementation here
  }
  
  res.status(200).json({ ok: true });
}
```

## Support

For issues or questions:
1. Check Telegram Bot API documentation
2. Verify Next.js deployment is working
3. Test Mini App in Telegram Web first
4. Check browser console for errors

## Security Notes

- Never expose bot token in client-side code
- Use environment variables for sensitive data
- Implement proper validation for Telegram data
- Use HTTPS everywhere
- Validate all user inputs

---

**Mini App URL**: https://kflix.space
**Bot Token**: 8367909351:AAHNcf72bwSvOXYx4C8_sG6ovAfq_Bv2aVg

🎬 Your KFLIX Telegram Mini App is ready to go!