/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />
declare module '*.scss' {
    const content: any;
    export default content;
}

declare module '*.md' {
    const content: string;
    export default content;
}

interface Window {
    baseUrl: any
    jQuery?: any
    $?: any
}