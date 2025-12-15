
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function RedditFeed() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">r/nitsilchar</CardTitle>
                <CardDescription>
                    Click the button below to view the latest posts and discussions from the NIT Silchar community on Reddit.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <a
                    href="https://www.reddit.com/r/nitsilchar/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="secondary">
                        Visit r/nitsilchar
                        <ExternalLink className="ml-2 h-4 w-4"/>
                    </Button>
                </a>
            </CardContent>
        </Card>
    );
}
