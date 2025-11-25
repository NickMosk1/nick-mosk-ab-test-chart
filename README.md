# A/B Test Analytics Dashboard

![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![Recharts](https://img.shields.io/badge/Recharts-2.x-green)

An interactive dashboard for visualizing A/B test statistics with real-time conversion rate charts.

## 🚀 Live Demo

**[Live Demo on GitHub Pages](https://nickmosk1.github.io/nick-mosk-ab-test-chart/)**

## 📊 Features

### ✅ Core Requirements
- **📈 Interactive Line Chart** displaying conversion rates for all variations
- **🔍 Interactive Tooltip** with detailed information on hover
- **🎛️ Variations Selector** with at least one variation always selected
- **📅 Data Grouping** by day/week
- **📱 Responsive Design** for screens 671px - 1300px+
- **🔄 Automatic Axis Scaling** to fit visible data range
- **📊 Percentage Display** of all values

### ⭐ Bonus Features
- **🎨 Line Type Selector** (Line, Smooth, Area)
- **📤 Chart Export** to PNG format
- **⚡ Fast Loading** with Vite
- **🏗️ Modular Architecture** with MobX state management

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Charts**: Recharts
- **State Management**: MobX
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **Deployment**: GitHub Pages

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Clone repository
git clone https://github.com/nickmosk1/nick-mosk-ab-test-chart.git
cd nick-mosk-ab-test-chart

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

The application will be available at: `http://localhost:5173`

## 🎯 Usage

### Core Functionality

1. **View Conversion Charts**
   - Chart automatically calculates conversionRate = (conversions / visits) * 100
   - All values displayed as percentages

2. **Manage Variations**
   - Select displayed variations via chips component
   - At least one variation must always be selected

3. **Data Grouping**
   - Switch between daily and weekly view
   - Data aggregation for weekly grouping

4. **Display Settings**
   - Choose line type: Line, Smooth, etc.

5. **Data Export**
   - Download current chart as PNG

## 📊 Implementation Highlights

### Architecture
- **Modular structure** for scalability
- **MobX** for reactive state management
- **TypeScript** for type safety
- **CSS Modules** for scoped styling

### Data Flow
```
Mock Data → Data Service → MobX Store → Components → Recharts
```

## 🚀 Deployment

The project automatically deploys to GitHub Pages on push to the `dev` branch via GitHub Actions.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [dev]
```

## 📄 License

This project was created as part of a technical assignment.

## 👨‍💻 Author

**Nick Mosk**
- GitHub: [@nickmosk1](https://github.com/nickmosk1)

---
