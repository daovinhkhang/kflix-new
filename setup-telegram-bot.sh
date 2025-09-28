#!/bin/bash

# KFLIX Telegram Mini App - Quick Setup Script
# This script helps configure your Telegram bot for the Mini App

BOT_TOKEN="8367909351:AAHNcf72bwSvOXYx4C8_sG6ovAfq_Bv2aVg"
MINI_APP_URL="https://kflix.space"
BOT_API_URL="https://api.telegram.org/bot${BOT_TOKEN}"

echo "🎬 KFLIX Telegram Mini App Setup"
echo "================================="
echo ""

# Function to make API calls
call_api() {
    local method=$1
    local data=$2
    
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "$data" \
        "${BOT_API_URL}/${method}")
    
    echo "Response: $response"
    echo ""
}

# Set bot commands
echo "📋 Setting bot commands..."
commands_data='{
    "commands": [
        {"command": "start", "description": "Launch KFLIX Mini App"},
        {"command": "help", "description": "Get help and information"},
        {"command": "movies", "description": "Browse latest movies"},
        {"command": "tv", "description": "Browse TV shows"},
        {"command": "search", "description": "Search for content"}
    ]
}'

call_api "setMyCommands" "$commands_data"

# Set menu button
echo "🔘 Setting menu button..."
menu_button_data='{
    "menu_button": {
        "type": "web_app",
        "text": "🎬 Open KFLIX",
        "web_app": {
            "url": "'$MINI_APP_URL'"
        }
    }
}'

call_api "setChatMenuButton" "$menu_button_data"

# Set bot description
echo "📝 Setting bot description..."
description_data='{
    "description": "KFLIX - Your ultimate streaming destination! 🎬\n\nStream and discover movies, TV shows, and entertainment content. Access the latest releases and classic favorites right in Telegram.\n\nTap the menu button to launch the app!"
}'

call_api "setMyDescription" "$description_data"

# Set short description
echo "📄 Setting short description..."
short_desc_data='{
    "short_description": "🎬 Stream movies & TV shows in Telegram"
}'

call_api "setMyShortDescription" "$short_desc_data"

# Get bot info
echo "ℹ️  Bot information:"
call_api "getMe" "{}"

echo "✅ Setup completed!"
echo ""
echo "Next steps:"
echo "1. Upload a bot profile picture via @BotFather"
echo "2. Deploy your app to https://kflix.space"
echo "3. Test the Mini App by opening your bot in Telegram"
echo ""
echo "Bot Token: $BOT_TOKEN"
echo "Mini App URL: $MINI_APP_URL"