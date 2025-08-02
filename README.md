# Simple Frontend CI/CD

A modern React application built with Vite, featuring a streamlined CI/CD pipeline and Docker containerization.

## 🚀 Features

- **React 19** with latest features and performance improvements
- **Vite** for lightning-fast development and building
- **ESLint** configuration for code quality
- **Docker** containerization for consistent deployment
- **Nginx** serving for production builds
- **CI/CD** ready setup with GitHub Actions
- **Docker Hub** integration for image registry
- **Animated Background** with floating particles
- **Dark/Light Theme Toggle** for better user experience
- **Favorites System** to save and manage favorite quotes
- **Quote Counter** to track how many quotes you've fetched
- **Responsive Design** that works on all devices

## 🎨 App Features

### Interactive Elements
- **Get Quote Button**: Fetches random quotes from the API
- **Favorite Button**: Save quotes to your favorites list
- **Theme Toggle**: Switch between light and dark themes
- **Quote Counter**: Tracks total quotes fetched
- **Favorites Counter**: Shows number of saved quotes

### Visual Enhancements
- **Animated Particles**: Floating background elements for visual appeal
- **Smooth Transitions**: All interactions have smooth animations
- **Modern UI**: Clean, modern design with gradient backgrounds
- **Responsive Layout**: Optimized for desktop, tablet, and mobile

### Data Persistence
- **Local Storage**: Favorites are saved locally and persist between sessions
- **Quote History**: View your last 3 favorite quotes
- **Remove Favorites**: Easy removal of saved quotes

## 📦 Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 4.5.0
- **Package Manager**: npm
- **Linting**: ESLint with React-specific rules
- **Container**: Docker with multi-stage builds
- **Web Server**: Nginx (production)

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Simple-Frontend-CICD
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

### Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🐳 Docker Deployment

### Building the Docker Image

```bash
docker build -t frontend-app .
```

### Running the Container

```bash
docker run -p 80:80 frontend-app
```

The application will be available at `http://localhost:80`

### Docker Compose (Optional)

Create a `docker-compose.yml` file for easier management:

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## 🔧 CI/CD Pipeline

This project is designed to work with CI/CD pipelines. The Dockerfile uses a multi-stage build process:

1. **Build Stage**: Uses Node.js to install dependencies and build the application
2. **Production Stage**: Uses Nginx to serve the built static files

### Pipeline Steps

1. **Build**: `npm run build`
2. **Lint**: `npm run lint`
3. **Docker Build**: Multi-stage Docker build
4. **Push to Docker Hub**: Automated image publishing
5. **Deploy**: Container deployment (Cloud Run ready)

## 🚀 GitHub Actions CI/CD

This project includes automated CI/CD workflows that build Docker images and push them to Docker Hub on every push to the main branch.

### Required Workflow Files

Create the following workflow files in your repository:

- **`.github/workflows/frontend-ci.yml`** - Builds and pushes frontend Docker image
- **`.github/workflows/backend-ci.yml`** - Builds and pushes backend Docker image

### Required GitHub Secrets

To enable the CI/CD pipeline, you need to set up the following secrets in your GitHub repository:

1. **DOCKER_USERNAME** – Your Docker Hub username
2. **DOCKER_PASSWORD** – Your Docker Hub access token or password

#### Setting up GitHub Secrets:

1. Go to your GitHub repository
2. Navigate to `Settings → Secrets and variables → Actions`
3. Click `New repository secret`
4. Add each secret:
   - Name: `DOCKER_USERNAME`, Value: Your Docker Hub username
   - Name: `DOCKER_PASSWORD`, Value: Your Docker Hub access token

> **Note**: For Docker Hub password, it's recommended to use an [access token](https://hub.docker.com/settings/security) instead of your account password for better security.

### Docker Hub Images

After successful CI/CD runs, your Docker images will be available at:
- Frontend: `natarajanrepo/frontend-gcp:latest`
- Backend: `natarajanrepo/backend-gcp:latest`

### Next Steps: GCP Cloud Run Deployment

Once the Docker images are successfully pushed to Docker Hub, the next step is to deploy them to Google Cloud Platform Cloud Run:

1. ✅ **Build Docker images** (Current)
2. ✅ **Push to Docker Hub** (Current)
3. 🔄 **Deploy to Cloud Run** (Next)

## 📁 Project Structure

```
Simple-Frontend-CICD/
├── src/                 # Source code
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   └── assets/         # Static assets
├── public/             # Public assets
├── Dockerfile          # Docker configuration
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your-api-url
VITE_APP_TITLE=Your App Title
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Docker Documentation](https://docs.docker.com/)
