'use client';

import { setModalClose } from '@/redux/features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Modal } from '@nextui-org/react';
import { useEffect } from 'react';

type Props = {};

export default function RootModal({ }: Props) {
    const { isOpen, type } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setModalClose());
    }, []);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    dispatch(setModalClose());
                }}
                scrollBehavior="inside"
            >
                {/* {type === 'Login' && <LoginModal />} */}
                <></>
            </Modal>
        </>
    );
}
