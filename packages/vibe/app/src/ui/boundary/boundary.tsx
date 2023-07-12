import React, { ReactNode, ErrorInfo } from "react";
import { ReactError } from "../../internals/manager";

interface ErrorBoundaryProps {
    children: ReactNode;
    onReactError: (err: ReactError) => void;
    fallback: ReactNode;
    hmrActivation: boolean;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class RootBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    componentDidCatch(_, errorInfo: ErrorInfo) {
        const { onReactError } = this.props;
        onReactError({
            source: "react",
            ...errorInfo,
        });
        this.setState({ hasError: true });
    }

    render() {
        const { hasError } = this.state;
        const { children, fallback, hmrActivation } = this.props;

        if (hasError || hmrActivation) {
            return fallback;
        }
        return children;
    }
}
