import React from "react";
import styles from "./styles.module.scss";
import { useLayersAddon, useOutlineAddon, useResizeAddon, useSettings } from "../../controls";
import { TabSection } from "./tabs";
import { Tab, Tabs } from "../ui/tabs";

const ResizeAddon = ({ onClick, enabled }: { onClick: () => void; enabled: boolean }) => (
    <div
        className={styles.addon}
        data-enabled={enabled}
        onClick={onClick}
        role='button'
        tabIndex={0}
    >
        <svg width='65%' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M7.6071 5.90268C7.6071 5.76241 7.56329 5.64843 7.47569 5.56076C7.39159 5.47308 7.28121 5.42925 7.14455 5.42925H3.55979L2.5138 5.46607L4.24836 3.78801C4.29391 3.74242 4.3272 3.68981 4.34823 3.63019C4.36925 3.57058 4.37976 3.51096 4.37976 3.45134C4.37976 3.31808 4.33421 3.20936 4.2431 3.1252C4.1555 3.03752 4.04687 2.99369 3.91721 2.99369C3.85414 2.99369 3.79282 3.00596 3.73325 3.03051C3.67368 3.05506 3.61761 3.09363 3.56505 3.14624L1.16294 5.54498C1.11389 5.59758 1.07359 5.65369 1.04205 5.71331C1.01402 5.77293 1 5.83605 1 5.90268C1 5.96581 1.01402 6.02718 1.04205 6.0868C1.07359 6.14641 1.11389 6.20252 1.16294 6.25513L3.56505 8.65387C3.61761 8.70647 3.67368 8.74505 3.73325 8.76959C3.79282 8.79414 3.85414 8.80642 3.91721 8.80642C4.04687 8.80642 4.1555 8.76433 4.2431 8.68017C4.33421 8.59249 4.37976 8.48203 4.37976 8.34876C4.37976 8.28564 4.36925 8.22427 4.34823 8.16465C4.3272 8.10503 4.29391 8.05418 4.24836 8.0121L2.5138 6.3393L3.55979 6.37086H7.14455C7.28121 6.37086 7.39159 6.32702 7.47569 6.23935C7.56329 6.15167 7.6071 6.03945 7.6071 5.90268ZM9 11C9.13666 11 9.2488 10.9562 9.3364 10.8685C9.424 10.7808 9.46781 10.6686 9.46781 10.5318V1.45765C9.46781 1.32439 9.424 1.21568 9.3364 1.13151C9.2488 1.04384 9.13666 1 9 1C8.86334 1 8.74945 1.04384 8.65834 1.13151C8.57074 1.21568 8.52694 1.32439 8.52694 1.45765V10.5318C8.52694 10.6686 8.57074 10.7808 8.65834 10.8685C8.74945 10.9562 8.86334 11 9 11ZM10.3929 5.90268C10.3929 6.03945 10.435 6.15167 10.5191 6.23935C10.6067 6.32702 10.7188 6.37086 10.8555 6.37086H14.435L15.4862 6.3393L13.7516 8.0121C13.7061 8.05418 13.6728 8.10503 13.6518 8.16465C13.6307 8.22427 13.6202 8.28564 13.6202 8.34876C13.6202 8.48203 13.664 8.59249 13.7516 8.68017C13.8392 8.76433 13.9479 8.80642 14.0775 8.80642C14.1441 8.80642 14.2072 8.79414 14.2668 8.76959C14.3263 8.74505 14.3824 8.70647 14.435 8.65387L16.8371 6.25513C16.8861 6.20252 16.9247 6.14641 16.9527 6.0868C16.9842 6.02718 17 5.96581 17 5.90268C17 5.83605 16.9842 5.77293 16.9527 5.71331C16.9247 5.65369 16.8861 5.59758 16.8371 5.54498L14.435 3.14624C14.3824 3.09363 14.3263 3.05506 14.2668 3.03051C14.2072 3.00596 14.1441 2.99369 14.0775 2.99369C13.9479 2.99369 13.8392 3.03752 13.7516 3.1252C13.664 3.20936 13.6202 3.31808 13.6202 3.45134C13.6202 3.51096 13.6307 3.57058 13.6518 3.63019C13.6728 3.68981 13.7061 3.74242 13.7516 3.78801L15.4862 5.46607L14.435 5.42925H10.8555C10.7188 5.42925 10.6067 5.47308 10.5191 5.56076C10.435 5.64843 10.3929 5.76241 10.3929 5.90268Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.3'
            />
        </svg>
    </div>
);

export const OutlineAddon = ({ onClick, enabled }: { onClick: () => void; enabled: boolean }) => (
    <div
        className={styles.addon}
        data-enabled={enabled}
        onClick={onClick}
        role='button'
        tabIndex={0}
    >
        <svg viewBox='0 0 13 18' height='60%' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M7.3717 17.5C8.49683 17.5 9.48132 17.2549 10.3252 16.7647C11.169 16.2799 11.8245 15.5851 12.2915 14.6801C12.7638 13.7698 13 12.6844 13 11.424V9.65447C13 8.72798 12.793 8.00349 12.3791 7.48099C11.9704 6.95849 11.3946 6.69455 10.6516 6.68916C10.5613 6.3929 10.3995 6.16128 10.1659 5.9943C9.93774 5.82193 9.65646 5.73574 9.3221 5.73574C9.09389 5.73574 8.86037 5.77614 8.62155 5.85694C8.52071 5.52836 8.34558 5.2725 8.09614 5.08935C7.8467 4.90082 7.54949 4.80656 7.20452 4.80656C7.01346 4.80656 6.82506 4.83349 6.63931 4.88736V2.19677C6.63931 1.68504 6.48805 1.27567 6.18554 0.968631C5.88834 0.65621 5.50356 0.5 5.03122 0.5C4.55888 0.5 4.1688 0.65621 3.86098 0.968631C3.55847 1.27567 3.40721 1.68504 3.40721 2.19677V8.93536C3.40721 8.98384 3.38864 9.00808 3.35149 9.00808C3.31965 9.00808 3.29576 8.98923 3.27984 8.95152L2.75443 7.66682C2.62175 7.34902 2.4413 7.10932 2.21309 6.94772C1.99019 6.78074 1.7381 6.69724 1.45681 6.69724C1.06939 6.69724 0.729742 6.81844 0.437845 7.06084C0.145948 7.29784 0 7.6372 0 8.0789C0 8.20279 0.0106144 8.34015 0.0318433 8.49097C0.0583793 8.64179 0.0955298 8.78723 0.143295 8.92728L1.54438 12.9268C2.0751 14.4458 2.82873 15.5878 3.80526 16.3527C4.78178 17.1176 5.9706 17.5 7.3717 17.5ZM7.41151 16.385C6.3023 16.385 5.33108 16.0941 4.49785 15.5124C3.66461 14.936 3.00387 13.9583 2.5156 12.5794L1.10654 8.59601C1.06408 8.47212 1.04285 8.34823 1.04285 8.22433C1.04285 8.08428 1.09062 7.96309 1.18615 7.86074C1.28168 7.7584 1.40905 7.70722 1.56827 7.70722C1.8124 7.70722 1.99284 7.85266 2.1096 8.14354L3.20023 10.5998C3.28515 10.8045 3.38599 10.9472 3.50274 11.028C3.62481 11.1035 3.75749 11.1412 3.90079 11.1412C4.06531 11.1412 4.20064 11.0819 4.30679 10.9634C4.41293 10.8395 4.466 10.686 4.466 10.5029V2.12405C4.466 1.95168 4.51908 1.81163 4.62522 1.7039C4.73136 1.59617 4.8667 1.5423 5.03122 1.5423C5.19574 1.5423 5.32842 1.59617 5.42926 1.7039C5.5301 1.81163 5.58052 1.95168 5.58052 2.12405V8.10314C5.58052 8.24319 5.63094 8.36169 5.73177 8.45865C5.83261 8.55561 5.95202 8.60409 6.09001 8.60409C6.228 8.60409 6.34476 8.55561 6.44029 8.45865C6.54112 8.36169 6.59154 8.24319 6.59154 8.10314V5.9539C6.74014 5.87849 6.89936 5.84078 7.06919 5.84078C7.26556 5.84078 7.41947 5.90272 7.53092 6.02662C7.64768 6.15051 7.70606 6.32018 7.70606 6.53565V8.41017C7.70606 8.56099 7.75647 8.68219 7.85731 8.77376C7.96346 8.86534 8.08287 8.91112 8.21555 8.91112C8.34823 8.91112 8.46499 8.86534 8.56582 8.77376C8.66666 8.68219 8.71708 8.56099 8.71708 8.41017V6.88308C8.86568 6.81305 9.02224 6.77804 9.18677 6.77804C9.38844 6.77804 9.545 6.83999 9.65646 6.96388C9.76791 7.08238 9.82363 7.24937 9.82363 7.46483V8.72528C9.82363 8.87072 9.87405 8.98923 9.97489 9.0808C10.081 9.17237 10.2031 9.21816 10.3411 9.21816C10.4685 9.21816 10.5826 9.17237 10.6834 9.0808C10.7842 8.98923 10.8347 8.87072 10.8347 8.72528V7.7961C11.1902 7.7961 11.4636 7.97386 11.6546 8.32937C11.851 8.6795 11.9492 9.17506 11.9492 9.81606V11.2947C11.9492 12.3774 11.7661 13.2985 11.3999 14.058C11.039 14.8121 10.5189 15.3885 9.83955 15.7871C9.16023 16.1857 8.35088 16.385 7.41151 16.385Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.1'
            />
        </svg>
    </div>
);

export const LayerAddon = ({ onClick, enabled }: { onClick: () => void; enabled: boolean }) => (
    <div
        className={styles.addon}
        data-enabled={enabled}
        onClick={onClick}
        role='button'
        tabIndex={0}
    >
        <svg width='55%' viewBox='0 0 17 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12.1154 14.9927C12.3256 14.9927 12.5103 14.9291 12.6692 14.8021C12.8282 14.675 12.9974 14.4648 13.1769 14.1716L16.6846 8.43108C16.7923 8.25513 16.8718 8.09384 16.9231 7.94721C16.9744 7.7957 17 7.64663 17 7.5C17 7.35337 16.9744 7.20674 16.9231 7.06012C16.8718 6.9086 16.7923 6.74487 16.6846 6.56891L13.1769 0.828446C12.9974 0.535191 12.8282 0.325024 12.6692 0.197947C12.5103 0.07087 12.3256 0.00733138 12.1154 0.00733138C11.9051 0.00733138 11.7205 0.07087 11.5615 0.197947C11.4026 0.325024 11.2308 0.535191 11.0462 0.828446L7.54615 6.56891C7.43333 6.74487 7.35128 6.9086 7.3 7.06012C7.25385 7.20674 7.23077 7.35337 7.23077 7.5C7.23077 7.64663 7.25641 7.7957 7.30769 7.94721C7.35897 8.09384 7.43846 8.25513 7.54615 8.43108L11.0462 14.1716C11.2308 14.4648 11.4026 14.675 11.5615 14.8021C11.7205 14.9291 11.9051 14.9927 12.1154 14.9927ZM12.1154 13.4604C12.0846 13.4604 12.059 13.4409 12.0385 13.4018L8.68462 7.82258C8.60769 7.70039 8.56923 7.59286 8.56923 7.5C8.56923 7.40225 8.60513 7.29472 8.67692 7.17742L12.0385 1.59091C12.059 1.5567 12.0846 1.53959 12.1154 1.53959C12.1462 1.53959 12.1718 1.5567 12.1923 1.59091L15.5462 7.17742C15.6179 7.29472 15.6538 7.40225 15.6538 7.5C15.6538 7.59286 15.6179 7.70039 15.5462 7.82258L12.1923 13.4018C12.1718 13.4409 12.1462 13.4604 12.1154 13.4604ZM8.26923 15C8.4282 15 8.56667 14.9536 8.68462 14.8607C8.80769 14.7727 8.89487 14.6774 8.94615 14.5748L4.81538 7.77859C4.78462 7.72483 4.75897 7.67595 4.73846 7.63196C4.71795 7.58309 4.70769 7.5391 4.70769 7.5C4.70769 7.45601 4.71795 7.41202 4.73846 7.36804C4.75897 7.31916 4.78462 7.27028 4.81538 7.22141L8.94615 0.42522C8.88974 0.322581 8.8 0.227273 8.67692 0.139296C8.55897 0.0464321 8.42308 0 8.26923 0C8.14615 0 8.02308 0.0342131 7.9 0.102639C7.78205 0.166178 7.67949 0.266373 7.59231 0.403226L3.69231 6.70088C3.59487 6.8524 3.51538 6.99169 3.45385 7.11877C3.39231 7.24096 3.36154 7.36804 3.36154 7.5C3.36154 7.63196 3.39231 7.75904 3.45385 7.88123C3.51538 8.00342 3.59487 8.14272 3.69231 8.29912L7.6 14.5968C7.68718 14.7336 7.78974 14.8338 7.90769 14.8974C8.03077 14.9658 8.15128 15 8.26923 15ZM4.50769 14.6994C4.64615 14.6994 4.7641 14.653 4.86154 14.5601C4.95897 14.4673 5.00769 14.3524 5.00769 14.2155C5.00769 14.0787 4.95897 13.9638 4.86154 13.871C4.7641 13.7781 4.64615 13.7317 4.50769 13.7317C4.3641 13.7317 4.24359 13.7781 4.14615 13.871C4.04872 13.9638 4 14.0787 4 14.2155C4 14.3524 4.04872 14.4673 4.14615 14.5601C4.24359 14.653 4.3641 14.6994 4.50769 14.6994ZM3.70769 13.3358C3.85128 13.3358 3.97179 13.2893 4.06923 13.1965C4.16667 13.1036 4.21538 12.9888 4.21538 12.8519C4.21538 12.7199 4.16667 12.6075 4.06923 12.5147C3.97179 12.4218 3.85128 12.3754 3.70769 12.3754C3.56923 12.3754 3.45128 12.4218 3.35385 12.5147C3.25641 12.6075 3.20769 12.7199 3.20769 12.8519C3.20769 12.9888 3.25641 13.1036 3.35385 13.1965C3.45128 13.2893 3.56923 13.3358 3.70769 13.3358ZM2.90769 11.9795C3.04615 11.9795 3.1641 11.933 3.26154 11.8402C3.3641 11.7424 3.41538 11.6276 3.41538 11.4956C3.41538 11.3636 3.3641 11.2512 3.26154 11.1584C3.1641 11.0606 3.04615 11.0117 2.90769 11.0117C2.76923 11.0117 2.65128 11.0606 2.55385 11.1584C2.45641 11.2512 2.40769 11.3636 2.40769 11.4956C2.40769 11.6276 2.45641 11.7424 2.55385 11.8402C2.65128 11.933 2.76923 11.9795 2.90769 11.9795ZM2.1 10.6305C2.23846 10.6305 2.35641 10.5841 2.45385 10.4912C2.55641 10.3935 2.60769 10.2786 2.60769 10.1466C2.60769 10.0147 2.55641 9.90225 2.45385 9.80938C2.35641 9.71163 2.23846 9.66276 2.1 9.66276C1.96154 9.66276 1.84359 9.71163 1.74615 9.80938C1.64872 9.90225 1.6 10.0147 1.6 10.1466C1.6 10.2786 1.64872 10.3935 1.74615 10.4912C1.84359 10.5841 1.96154 10.6305 2.1 10.6305ZM1.30769 9.25953C1.44615 9.25953 1.5641 9.2131 1.66154 9.12023C1.75897 9.02737 1.80769 8.91496 1.80769 8.78299C1.80769 8.64614 1.75897 8.53128 1.66154 8.43842C1.5641 8.34555 1.44615 8.29912 1.30769 8.29912C1.16923 8.29912 1.04872 8.34555 0.946154 8.43842C0.848718 8.53128 0.8 8.64614 0.8 8.78299C0.8 8.91496 0.848718 9.02737 0.946154 9.12023C1.04872 9.2131 1.16923 9.25953 1.30769 9.25953ZM0.507692 7.90323C0.646154 7.90323 0.764103 7.85679 0.861538 7.76393C0.958974 7.67107 1.00769 7.55865 1.00769 7.42669C1.00769 7.28983 0.958974 7.17498 0.861538 7.08211C0.764103 6.98925 0.646154 6.94282 0.507692 6.94282C0.364103 6.94282 0.24359 6.98925 0.146154 7.08211C0.0487179 7.17498 0 7.28983 0 7.42669C0 7.55865 0.0487179 7.67107 0.146154 7.76393C0.24359 7.85679 0.364103 7.90323 0.507692 7.90323ZM1.30769 6.54692C1.44615 6.54692 1.5641 6.50049 1.66154 6.40762C1.75897 6.31476 1.80769 6.20235 1.80769 6.07038C1.80769 5.93353 1.75897 5.81867 1.66154 5.72581C1.5641 5.63294 1.44615 5.58651 1.30769 5.58651C1.16923 5.58651 1.04872 5.63294 0.946154 5.72581C0.848718 5.81867 0.8 5.93353 0.8 6.07038C0.8 6.20235 0.848718 6.31476 0.946154 6.40762C1.04872 6.50049 1.16923 6.54692 1.30769 6.54692ZM2.1 5.18328C2.23846 5.18328 2.35641 5.13685 2.45385 5.04399C2.55641 4.94624 2.60769 4.83138 2.60769 4.69941C2.60769 4.56745 2.55641 4.45503 2.45385 4.36217C2.35641 4.26931 2.23846 4.22287 2.1 4.22287C1.96154 4.22287 1.84359 4.26931 1.74615 4.36217C1.64872 4.45503 1.6 4.56745 1.6 4.69941C1.6 4.83138 1.64872 4.94624 1.74615 5.04399C1.84359 5.13685 1.96154 5.18328 2.1 5.18328ZM2.90769 3.83431C3.04615 3.83431 3.1641 3.78788 3.26154 3.69501C3.3641 3.59726 3.41538 3.4824 3.41538 3.35044C3.41538 3.21848 3.3641 3.10606 3.26154 3.0132C3.1641 2.91544 3.04615 2.86657 2.90769 2.86657C2.76923 2.86657 2.65128 2.91544 2.55385 3.0132C2.45641 3.10606 2.40769 3.21848 2.40769 3.35044C2.40769 3.4824 2.45641 3.59726 2.55385 3.69501C2.65128 3.78788 2.76923 3.83431 2.90769 3.83431ZM3.70769 2.46334C3.85128 2.46334 3.97179 2.41691 4.06923 2.32405C4.16667 2.23118 4.21538 2.11877 4.21538 1.9868C4.21538 1.84995 4.16667 1.73509 4.06923 1.64223C3.97179 1.54936 3.85128 1.50293 3.70769 1.50293C3.56923 1.50293 3.45128 1.54936 3.35385 1.64223C3.25641 1.73509 3.20769 1.84995 3.20769 1.9868C3.20769 2.11877 3.25641 2.23118 3.35385 2.32405C3.45128 2.41691 3.56923 2.46334 3.70769 2.46334ZM4.50769 1.10704C4.64615 1.10704 4.7641 1.06061 4.86154 0.967742C4.95897 0.874878 5.00769 0.762463 5.00769 0.630499C5.00769 0.493646 4.95897 0.378788 4.86154 0.285924C4.7641 0.19306 4.64615 0.146628 4.50769 0.146628C4.3641 0.146628 4.24359 0.19306 4.14615 0.285924C4.04872 0.378788 4 0.493646 4 0.630499C4 0.762463 4.04872 0.874878 4.14615 0.967742C4.24359 1.06061 4.3641 1.10704 4.50769 1.10704Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.1'
            />
        </svg>
    </div>
);

export const SidebarButton = ({ onClick }: { onClick: () => void }) => (
    <div className={styles.addon} onClick={onClick} role='button' tabIndex={0}>
        <svg width='55%' viewBox='0 0 19 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M10.193 12.5801H15.8978C16.1503 12.5801 16.3302 12.5231 16.4377 12.409C16.5505 12.2949 16.6069 12.1075 16.6069 11.8468V3.16133C16.6069 2.9006 16.5505 2.7132 16.4377 2.59913C16.3302 2.48506 16.1503 2.42803 15.8978 2.42803H10.193C9.94049 2.42803 9.75785 2.48506 9.64504 2.59913C9.5376 2.7132 9.48388 2.9006 9.48388 3.16133V11.8468C9.48388 12.1075 9.5376 12.2949 9.64504 12.409C9.75785 12.5231 9.94049 12.5801 10.193 12.5801ZM2.74767 7.49593C2.74767 7.64259 2.7987 7.77295 2.90076 7.88702C3.0082 7.99565 3.13175 8.04997 3.27142 8.04997H5.52757L6.7201 8.00109L6.05131 8.64476L5.18109 9.51657C5.07902 9.61434 5.02799 9.74199 5.02799 9.89951C5.02799 10.0462 5.07096 10.1684 5.15691 10.2662C5.24823 10.3585 5.36373 10.4047 5.50339 10.4047C5.58397 10.4047 5.6538 10.3884 5.71289 10.3558C5.77735 10.3232 5.83644 10.2743 5.89016 10.2091L8.0335 7.89517C8.15168 7.7648 8.21077 7.63172 8.21077 7.49593C8.21077 7.36013 8.15168 7.22705 8.0335 7.09669L5.89016 4.78273C5.83644 4.72298 5.77735 4.67681 5.71289 4.64422C5.6538 4.61162 5.58397 4.59533 5.50339 4.59533C5.36373 4.59533 5.24823 4.64422 5.15691 4.74199C5.07096 4.83433 5.02799 4.95383 5.02799 5.10049C5.02799 5.25258 5.07902 5.38023 5.18109 5.48343L6.05131 6.34709L6.7201 6.99077L5.52757 6.95003H3.27142C3.13175 6.95003 3.0082 7.00435 2.90076 7.11298C2.79333 7.22162 2.7423 7.34927 2.74767 7.49593ZM2.53011 15H16.4699C17.3186 15 17.9525 14.7882 18.3715 14.3645C18.7905 13.9462 19 13.3188 19 12.4823V2.5258C19 1.6893 18.7905 1.05921 18.3715 0.635524C17.9525 0.211841 17.3186 0 16.4699 0H2.53011C1.68674 0 1.05287 0.211841 0.628499 0.635524C0.2095 1.05378 0 1.68387 0 2.5258V12.4823C0 13.3188 0.2095 13.9462 0.628499 14.3645C1.05287 14.7882 1.68674 15 2.53011 15ZM2.54623 13.6882C2.14334 13.6882 1.83446 13.5823 1.61959 13.3705C1.40472 13.1532 1.29729 12.8327 1.29729 12.409V2.59913C1.29729 2.17545 1.40472 1.85497 1.61959 1.6377C1.83446 1.42042 2.14334 1.31179 2.54623 1.31179H16.4538C16.8513 1.31179 17.1575 1.42042 17.3724 1.6377C17.5926 1.85497 17.7027 2.17545 17.7027 2.59913V12.409C17.7027 12.8327 17.5926 13.1532 17.3724 13.3705C17.1575 13.5823 16.8513 13.6882 16.4538 13.6882H2.54623Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.1'
            />
        </svg>
    </div>
);

export const Window = ({ children }: { children: React.ReactNode }) => {
    const { sidebarOpen, toggleSidebar, selectedPanel, updateSelectedPanel } = useSettings();
    const resizeAddon = useResizeAddon();
    const outlineAddon = useOutlineAddon();
    const layersAddon = useLayersAddon();

    return (
        <div className={styles.wrapper}>
            {/* features */}
            <div className={styles.tabs}>
                <Tabs selected={selectedPanel} onChange={updateSelectedPanel}>
                    <Tab value='sandbox'>
                        <div className={styles.tab}>Sandbox</div>
                    </Tab>
                    <Tab value='docs'>
                        <div className={styles.tab}>Docs</div>
                    </Tab>
                </Tabs>
                <div className={styles.features}>
                    {!sidebarOpen ? <SidebarButton onClick={toggleSidebar} /> : null}
                    <ResizeAddon
                        enabled={resizeAddon.enabled}
                        onClick={resizeAddon.toggleEnabled}
                    />
                    <OutlineAddon
                        enabled={outlineAddon.enabled}
                        onClick={outlineAddon.toggleEnabled}
                    />
                    <LayerAddon enabled={layersAddon.enabled} onClick={layersAddon.toggleEnabled} />
                </div>
            </div>
            <div className={styles.window} data-resize-enabled={resizeAddon.enabled}>
                <div className={styles.canvas}>{children}</div>
            </div>
            <TabSection />
        </div>
    );
};
