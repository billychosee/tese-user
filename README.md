# TESE - Premium Video Streaming Platform

A modern, paid video streaming platform built with Next.js, TypeScript, and Tailwind CSS. TESE combines the discovery experience of YouTube with the premium feel of Netflix/Prime Video, offering both pay-per-view and subscription-based content access.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/signup system
- **Trending Videos**: Dynamic carousel showcasing popular content
- **Category-Based Discovery**: Organized video browsing by categories
- **Video Access Models**: 
  - Pay-per-view for individual videos
  - Channel subscriptions for unlimited access
  - Free content availability
- **Channel Management**: Complete channel pages with subscription options
- **Video Playback**: Protected video player with access control

### User Experience
- **Dark Theme**: Cinematic, premium dark interface
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Horizontal Scrolling**: Smooth carousel navigation
- **Access Control**: Clear paywall and subscription prompts
- **User Dashboard**: Personalized discovery and management

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React 18** with modern hooks

### State Management
- Server Components for data fetching
- Client Components for interactive features
- Context API for global state (authentication)

### Icons & Assets
- **Lucide React** for scalable icons
- **Placeholder images** for development

## 📁 Project Structure

```
TESE/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with dark theme
│   ├── page.tsx           # Authentication page
│   ├── dashboard/         # Main discovery dashboard
│   ├── watch/[videoId]/   # Video playback page
│   └── channel/[channelId]/ # Channel pages
├── components/            # Reusable UI components
│   ├── VideoCard.tsx      # Video thumbnail and info
│   ├── Carousel.tsx       # Horizontal scrolling container
│   ├── CategoryRow.tsx    # Category-specific video rows
│   ├── Navbar.tsx         # Navigation header
│   ├── SubscriptionButton.tsx # Channel subscription UI
│   └── PaywallModal.tsx   # Payment and access prompts
├── lib/                   # Utility functions and API
│   ├── api.ts            # Mock API service layer
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
│   ├── video.ts          # Video and category types
│   ├── channel.ts        # Channel and subscription types
│   └── user.ts           # User and authentication types
├── styles/               # Global styles and CSS
└── public/               # Static assets
```

## 🎯 Key Components

### VideoCard
- Displays video thumbnail, title, duration, and access type
- Shows category badges and pricing information
- Handles click events for video playback
- Responsive design for all screen sizes

### Carousel
- Horizontal scrolling container with smooth animations
- Optional navigation arrows
- Touch-friendly for mobile devices
- Auto-detection of scroll position

### CategoryRow
- Groups videos by category (Sports, Church, Football, etc.)
- Integrates with Carousel for consistent UX
- Supports dynamic category loading

### PaywallModal
- Handles payment and subscription flows
- Displays pricing and access options
- Integrates with mock payment processing

## 🔧 API Integration

The application is designed for easy backend integration:

### Current State
- **Mock API Service** (`lib/api.ts`) with realistic delays
- **Type-safe responses** with proper error handling
- **Authentication flow** with JWT tokens
- **CRUD operations** for videos, channels, and users

### Backend Integration Points
```typescript
// Authentication
authApi.login(email, password)
authApi.register(email, password, name)

// Video Management
videoApi.getTrending(page, limit)
videoApi.getByCategory(category, page, limit)
videoApi.getById(videoId)

// Channel Management
channelApi.getById(channelId)
channelApi.subscribe(channelId)
channelApi.unsubscribe(channelId)

// User Management
userApi.getProfile()
userApi.purchaseVideo(videoId)
```

### Expected Backend Response Format
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradient (`#667eea` to `#764ba2`)
- **Background**: Dark theme (`#1a1a1a` to `#000000`)
- **Text**: White and gray variants
- **Accent**: Category-specific colors

### Typography
- **Font**: System font stack with Inter fallback
- **Hierarchy**: Clear heading sizes and weights
- **Accessibility**: High contrast ratios

### Spacing & Layout
- **Container**: Max width 7xl with responsive padding
- **Grid System**: Flexible grid for video layouts
- **Spacing**: Consistent spacing scale

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `<640px` - Single column layout
- **Tablet**: `640px-1024px` - Two column layout
- **Desktop**: `>1024px` - Three column layout

### Mobile Optimizations
- **Touch-friendly** carousel navigation
- **Collapsible** navigation menu
- **Optimized** video player sizing
- **Readable** text sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd TESE

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `demo123`

## 🔄 Development Workflow

### Adding New Features
1. **Define Types**: Add TypeScript interfaces in `/types`
2. **Create Components**: Build reusable components in `/components`
3. **Implement API**: Add service functions in `/lib/api.ts`
4. **Update Pages**: Integrate into existing pages or create new ones
5. **Test Responsiveness**: Ensure mobile and desktop compatibility

### Component Guidelines
- **Single Responsibility**: Each component should have one clear purpose
- **Reusability**: Design for reuse across different contexts
- **Accessibility**: Include proper ARIA labels and keyboard navigation
- **Performance**: Optimize for fast rendering and smooth animations

### API Development
- **Mock First**: Implement mock API before backend integration
- **Type Safety**: Use TypeScript interfaces for all API responses
- **Error Handling**: Implement consistent error handling patterns
- **Loading States**: Provide appropriate loading and error states

## 🎯 Future Enhancements

### Video Features
- [ ] Video upload and management
- [ ] Video transcoding and multiple quality options
- [ ] Watch history and recommendations
- [ ] Video comments and ratings

### User Features
- [ ] User profiles and social features
- [ ] Watch lists and favorites
- [ ] Notifications system
- [ ] Multi-device sync

### Business Features
- [ ] Analytics dashboard for creators
- [ ] Revenue reporting and payouts
- [ ] Content moderation tools
- [ ] Advanced subscription plans

### Technical Improvements
- [ ] Server-side rendering optimization
- [ ] Image and video lazy loading
- [ ] Caching strategies
- [ ] Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the excellent React framework
- **Tailwind CSS** for rapid styling development
- **Lucide** for beautiful, consistent icons
- **TypeScript** for type safety and developer experience

---

**TESE** - Premium video streaming, reimagined for the modern web.