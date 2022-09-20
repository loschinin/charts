import React, { ReactNode} from 'react';
import './Page.css'

type Props = {
    children: ReactNode
}

export const Page = ({children}: Props) => {
    return (
        <div className={'page'}>
            {children}
        </div>
    );
};