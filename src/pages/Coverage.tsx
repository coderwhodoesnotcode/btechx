import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const coverageAreas = [
    { name: "Rawalpindi", zones: ["Saddar", "Commercial Market", "Satellite Town", "Bahria Town"] },
    { name: "Taxila", zones: ["Main Bazaar", "Wah Road", "G.T. Road", "Railway Road"] },
    { name: "Wah Cantt", zones: ["Mall Road", "Lalarukh", "POF Colony", "Commercial Area"] },
    { name: "Hassan Abdal", zones: ["City Center", "G.T. Road", "Bypass Road", "Main Market"] },
    { name: "Jhari Kas", zones: ["Near Academy", "Main Street", "Residential Area"] },
    { name: "B-17 Islamabad", zones: ["Sector B-17", "Commercial Area", "Residential Zones"] },
  ];

  const coverageMarkers = [
    { name: "Taxila", position: [33.7370, 72.7285] },
    { name: "Wah Cantt", position: [33.7715, 72.7440] },
    { name: "Hassan Abdal", position: [33.82735, 72.67941] },
    { name: "Jhari Kas", position: [33.90060, 72.77223] },
    { name: "B-17 Islamabad", position: [33.6810, 72.8349] },
  ];

  const handleSearch = () => {
    const query = searchInput.toLowerCase().trim();
    let found = false;

    coverageAreas.forEach(area => {
      if (area.name.toLowerCase() === query) found = true;
      area.zones.forEach(zone => {
        if (zone.toLowerCase() === query) found = true;
      });
    });

    if (found) {
      setSearchResult("🎉 You are in our service area!");
    } else {
      setSearchResult("❌ Sorry, you are not in our service area.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Check Our
              <span className="block gradient-primary bg-clip-text text-transparent">
                Service Coverage
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find out if BTechX fiber internet is available in your area
            </p>
          </div>

          {/* Search Box */}
          <Card className="glass p-6 max-w-2xl mx-auto mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your address or area..."
                  className="pl-10 bg-background/50"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button
                className="gradient-primary hover:opacity-90 transition-opacity"
                onClick={handleSearch}
              >
                Check
              </Button>
            </div>
            {searchResult && (
              <p className="mt-4 text-center text-lg font-semibold text-primary">
                {searchResult}
              </p>
            )}
          </Card>

          {/* Map */}
          <Card className="glass p-8 mb-12">
            <div className="aspect-video rounded-lg overflow-hidden">
              <MapContainer
                center={[33.7465, 72.7873]} 
                zoom={11}
                scrollWheelZoom={true}
                className="w-full h-full z-10 rounded-lg"
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* MARKERS */}
                {coverageMarkers.map((area, idx) => (
                  <Marker key={idx} position={area.position}>
                    <Popup>{area.name} — Service Area</Popup>
                  </Marker>
                ))}

                {/* POLYGON — combined coverage */}
                <Polygon
                  positions={[
                    [33.915172, 72.796093],
                    [33.929974, 72.740323],
                    [33.883516, 72.666275],
                    [33.830022, 72.577470],
                    [33.673038, 72.596812],
                    [33.644905, 72.815056],
                    [33.619176, 72.956046],
                    [33.819981, 72.901968],
                    [33.915172, 72.796093]
                  ]}
                  pathOptions={{
                    color: "#00C2FF",
                    fillColor: "#00C2FF",
                    fillOpacity: 0.25,
                  }}
                />
              </MapContainer>
            </div>
          </Card>

          {/* Coverage Areas List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageAreas.map((area, index) => (
              <Card key={index} className="glass p-6 hover-scale">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">{area.name}</h3>
                </div>
                <ul className="space-y-2">
                  {area.zones.map((zone, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{zone}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="glass p-8 text-center max-w-3xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-4">Don't See Your Area?</h3>
            <p className="text-muted-foreground mb-6">
              We're constantly expanding our network. Contact us to check if we're planning 
              coverage in your area or to express your interest.
            </p>
            <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity">
              Contact Us
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Coverage;
