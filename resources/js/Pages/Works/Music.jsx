import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import WorkGrid from '../../Components/WorkGrid';

export default function Music() {
    const items = [
        { title: 'Lost in the Echo', image: '/movies/music-1.png', rating: '9.8', year: '2024', tag: 'Visual Album' },
        { title: 'Midnight Rhythms', image: '/movies/poster-4.png', rating: '9.3', year: '2023', tag: 'Acoustic' },
        { title: 'Neon Pulse', image: '/movies/poster-3.png', rating: '9.0', year: '2024', tag: 'Electronic' },
        { title: 'Skyline Vibes', image: '/movies/poster-2.png', rating: '8.8', year: '2023', tag: 'Chill' },
    ];

    return (
        <AppLayout>
            <WorkGrid title="Music" subtitle="Videos" items={items} />
        </AppLayout>
    );
}
