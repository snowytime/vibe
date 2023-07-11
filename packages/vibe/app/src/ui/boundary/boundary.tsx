import React, { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode | ((errorInfo: ErrorInfo) => ReactNode);
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorInfo: ErrorInfo | null;
}

export class RootBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: null,
        };
    }

    componentDidCatch(_, errorInfo: ErrorInfo) {
        this.setState({ hasError: true, errorInfo });
    }

    render() {
        const { hasError, errorInfo } = this.state;
        const { children, fallback } = this.props;

        if (hasError) {
            return typeof fallback === "function" ? fallback(errorInfo) : fallback;
        }
        return children;
    }
}
