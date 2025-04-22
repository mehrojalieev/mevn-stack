import 'vue-router'

declare module 'vude-router'{
    interface RouteMeta {
        title?: string;
        svgIcon?: string;
        hidden?: boolean;
        roles?: string[];
        affix?: boolean
    }
}