import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import WorkGrid from '../../Components/WorkGrid';

export default function Cinema() {
    const items = [
        { title: 'The Silent Echo', image: '/movies/poster-1.png', rating: '9.4', year: '2024', tag: 'Feature Film' },
        { title: 'City Lights', image: '/movies/poster-2.png', rating: '8.9', year: '2023', tag: 'Cinema' },
        { title: 'Code Red', image: '/movies/poster-3.png', rating: '9.6', year: '2024', tag: 'Blockbuster' },
        { title: 'Love in Dhaka', image: '/movies/poster-4.png', rating: '8.7', year: '2023', tag: 'Romance' },
    ];

    return (
        <AppLayout>
            <WorkGrid title="Our" subtitle="Cinema" items={items} />
        </AppLayout>
    );
}
