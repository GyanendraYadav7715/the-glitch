import { SwiperContainer, SwiperSlide } from 'swiper/element';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'swiper-container': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    init?: string;
                    ref?: React.RefObject<any>;
                    class?: string;
                },
                HTMLElement
            >;
            'swiper-slide': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    class?: string;
                    key?: string | number;
                    suppressHydrationWarning?: boolean;
                },
                HTMLElement
            >;
        }
    }
}