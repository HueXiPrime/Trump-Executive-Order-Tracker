# Trump Executive Order Tracker

A real-time dashboard tracking the implementation status, legal challenges, and impact of Trump administration executive orders.

## Features

- 🤝 Community-driven updates
- 📊 Real-time status tracking of executive orders
- 🔍 Searchable and filterable database
- 📱 Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 20.0 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HueXiPrime/Trump-Executive-Order-Tracker.git
cd Trump-Executive-Order-Tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

We love welcome contributions! There are two main ways to contribute:

### 1. Via GitHub (Recommended)

- Fork the repository
- Edit `data/executive-orders.json`
- Submit a Pull Request

### 2. Via GitHub Issues

- Create an issue with your suggested changes

For detailed contribution guidelines, visit our [Contribution Guide](https://www.theexecutiveordertracker.com/contribute).

## Data Structure

Each executive order entry contains:

- Title
- Official document link
- Summary (max 200 characters)
- Current status
- Date signed
- Implementation notes
- Known lawsuits (if any)
- Impact forecast
- Stall probability

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Geist

## Development

```bash
# Start development server
npm run dev
# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## License

MIT License - feel free to use this code for your own projects.

## Acknowledgments

- Initial data curated by [Ben Shindel](https://x.com/BenShindel)
- Inspired by [Eigen's tweet](https://x.com/eigenrobot/status/1882143122945401306)
- Built with ❤️ by [Hue](https://x.com/huexi_)
