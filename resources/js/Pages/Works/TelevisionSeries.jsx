import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import WorkGrid from '../../Components/WorkGrid';

export default function TelevisionSeries() {
    const items = [
        { title: 'The Shattered Sky', image: '/movies/tv-1.png', rating: '9.5', year: '2024', tag: 'Action' },
        { title: 'Empire of Dust', image: '/movies/poster-3.png', rating: '9.1', year: '2023', tag: 'Political' },
        { title: 'Neon Streets', image: '/movies/poster-1.png', rating: '8.7', year: '2024', tag: 'Cyberpunk' },
        { title: 'City Limits', image: '/movies/poster-2.png', rating: '8.4', year: '2023', tag: 'Crime' },
    ];

    return (
        <AppLayout>
            <WorkGrid title="Television" subtitle="Series" items={items} />
        </AppLayout>
    );
}
