import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

const namespace = new k8s.core.v1.Namespace("matmatikk-app-namespace");

const appLabels = {app: "matmatikk-app"};

const deployment = new k8s.apps.v1.Deployment("matmatikk-app-deployment", {
    metadata: {
        namespace: namespace.metadata.name,
    },
    spec: {
        selector: {matchLabels: appLabels},
        replicas: 1,
        template: {
            metadata: {labels: appLabels},
            spec: {
                containers: [{
                    name: "matmatikk-app",
                    image: "matmatikk-app:latest",
                    ports: [
                        {
                            containerPort: 80
                        }
                    ],
                }],
            },
        },
    },
});

// Create a Service to expose the Deployment.
const service = new k8s.core.v1.Service("matmatikk-app-service", {
    metadata: {
        namespace: namespace.metadata.name,
    },
    spec: {
        selector: appLabels,
        ports: [{
            port: 80,
            targetPort: 80,
            nodePort: 30007
        }],
        type: "NodePort",
    },
});

// Export the Service's IP address.
export const ip = pulumi.interpolate`${service.status.loadBalancer.ingress[0].ip}:${service.spec.ports[0].nodePort}`;

