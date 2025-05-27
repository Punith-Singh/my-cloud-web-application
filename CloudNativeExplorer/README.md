# IBM CloudTodo - Enterprise Task Management

A cloud-native todo application built with React and Express.js, designed for deployment on IBM Cloud with Kubernetes.

## 🚀 Features

### Cloud-Native Architecture
- **Kubernetes-ready** with health checks and auto-scaling
- **12-Factor App** principles for cloud deployment
- **Microservices architecture** with RESTful APIs
- **Container-optimized** with multi-stage Docker builds

### Enterprise Features
- Real-time system monitoring and metrics
- Health endpoints for Kubernetes probes
- Auto-scaling configuration
- TLS/SSL termination ready
- Resource monitoring and limits

### Task Management
- Create, update, and delete tasks
- Priority levels (High, Medium, Low)
- Task completion tracking
- Real-time statistics dashboard

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│  Express API    │────│  Memory Store   │
│   (Frontend)    │    │   (Backend)     │    │   (Storage)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Health Checks  │
                    │  /health/ready  │
                    │  /health/live   │
                    └─────────────────┘
```

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Tanstack Query
- **Backend**: Node.js, Express.js, TypeScript
- **Infrastructure**: Docker, Kubernetes, IBM Cloud
- **Monitoring**: Built-in health checks and metrics

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api
   - Health checks: http://localhost:5000/health/ready

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t cloudtodo:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 cloudtodo:latest
   ```

### Kubernetes Deployment

1. **Apply the Kubernetes manifests**
   ```bash
   kubectl apply -f k8s-deployment.yaml
   ```

2. **Verify deployment**
   ```bash
   kubectl get pods -n cloudtodo
   kubectl get services -n cloudtodo
   ```

## 📊 API Endpoints

### Health Checks
- `GET /health/ready` - Readiness probe for Kubernetes
- `GET /health/live` - Liveness probe for Kubernetes

### System Information
- `GET /api/system-info` - System metrics and deployment info

### Todo Management
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /api/todos/stats` - Get todo statistics

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `development` |
| `APP_VERSION` | Application version | `v1.0.0` |
| `IBM_CLOUD_REGION` | IBM Cloud region | `us-south` |
| `KUBERNETES_CLUSTER_NAME` | Kubernetes cluster name | `cloudtodo-cluster` |
| `KUBERNETES_NAMESPACE` | Kubernetes namespace | `default` |

## 🏥 Health Monitoring

The application includes comprehensive health monitoring:

- **Readiness Probe**: Checks if the app is ready to receive traffic
- **Liveness Probe**: Checks if the app is running correctly
- **Resource Monitoring**: Memory and CPU usage tracking
- **Auto-scaling**: Horizontal Pod Autoscaler (HPA) configuration

## 📈 Production Considerations

### Security
- Non-root container execution
- Read-only filesystem
- Resource limits and requests
- TLS/SSL encryption ready

### Scalability
- Horizontal Pod Autoscaler (2-10 replicas)
- Load balancer configuration
- Stateless application design
- Efficient caching strategies

### Monitoring
- Health check endpoints
- System metrics collection
- Error logging and tracking
- Performance monitoring

## 🚀 IBM Cloud Deployment

1. **Create IBM Cloud Kubernetes Service cluster**
2. **Configure IBM Container Registry**
3. **Build and push Docker image**
4. **Deploy using Kubernetes manifests**
5. **Configure ingress and TLS**

## 📝 Development

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── lib/            # Utilities
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage
├── shared/                # Shared types and schemas
├── Dockerfile             # Container configuration
└── k8s-deployment.yaml    # Kubernetes manifests
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for IBM Cloud and Kubernetes