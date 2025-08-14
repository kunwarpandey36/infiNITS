
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CollegeMapPage() {
  const router = useRouter();
  const mapEmbedUrl = "https://www.google.com/maps/d/u/0/embed?mid=1EGf7oryG4ap3JTar4Rqcw3dPJ3GJvtc&ehbc=2E312F";
  const mapDirectUrl = "https://www.google.com/maps/d/u/0/viewer?mid=1EGf7oryG4ap3JTar4Rqcw3dPJ3GJvtc";

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <MapPin className="mr-3 h-8 w-8 text-primary" />
          College Map
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>NIT Silchar Campus Map</CardTitle>
          <CardDescription>
            An interactive map of the campus. The map is embedded from Google Maps.
            If it doesn't load or interact as expected, you can try opening it directly.
          </CardDescription>
        </CardHeader>
        <CardContent className="aspect-[16/9] md:aspect-[21/9] w-full">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            className="rounded-md border"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="NIT Silchar Campus Map"
          ></iframe>
        </CardContent>
      </Card>
       <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Viewing Options</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            If the embedded map is not ideal, or for a full-screen experience, please use the direct link below:
          </p>
          <a
            href={mapDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Map in New Tab
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
