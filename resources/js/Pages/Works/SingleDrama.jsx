import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import WorkGrid from '../../Components/WorkGrid';

export default function SingleDrama() {
    const items = [
        { title: 'The Melody of Silent Tears', image: '/movies/drama-1.png', rating: '9.2', year: '2024', tag: 'Romance' },
        { title: 'Shadow of Dhaka', image: '/movies/poster-1.png', rating: '8.8', year: '2023', tag: 'Thriller' },
        { title: 'Midnight Call', image: '/movies/poster-2.png', rating: '8.5', year: '2024', tag: 'Drama' },
        { title: 'Urban Echo', image: '/movies/poster-3.png', rating: '8.9', year: '2023', tag: 'Social' },
    ];

    return (
        <AppLayout>
            <WorkGrid title="Single" subtitle="Drama" items={items} />
        </AppLayout>
    );
}
