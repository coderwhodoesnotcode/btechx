import * as React from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

type Submission = {
  id: string;
  created_at: string;
  service_for: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  cnic: string;
  plan: string;
  equipment_policies: string;
  additional_router: string;
  support_policy: string;
};

const PLAN_COLOR: Record<string, string> = {
  "Rs. 22000 For Packages 6Mbps upto 16Mbps": "bg-blue-100 text-blue-700",
  "Rs. 35000 For Packages 20Mbps upto 50Mbps": "bg-purple-100 text-purple-700",
  FTTH: "bg-green-100 text-green-700",
  "Own Equipments": "bg-orange-100 text-orange-700",
};

const SERVICE_COLOR: Record<string, string> = {
  Home: "bg-sky-100 text-sky-700",
  Office: "bg-indigo-100 text-indigo-700",
  Shop: "bg-amber-100 text-amber-700",
  Other: "bg-gray-100 text-gray-700",
};

function Badge({ label, colorClass }: { label: string; colorClass?: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
        colorClass ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {label}
    </span>
  );
}

function Detail({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("btechx_admin", "1");
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="p-8 w-full max-w-sm glass text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={shake ? "animate-shake" : ""}>
            <Input
              type="password"
              placeholder="Password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              className={`text-center bg-white text-black ${
                error ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">Incorrect password</p>
            )}
          </div>
          <Button type="submit" className="w-full gradient-primary hover:opacity-90">
            Login
          </Button>
        </form>
      </Card>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminConnections() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("btechx_admin") === "1"
  );
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterService, setFilterService] = useState("All");
  const [filterPlan, setFilterPlan] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (authed) fetchSubmissions();
  }, [authed]);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("new_connection_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setSubmissions(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    setDeletingId(id);
    const { error } = await supabase
      .from("new_connection_requests")
      .delete()
      .eq("id", id);
    if (!error) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
    setDeletingId(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("btechx_admin");
    setAuthed(false);
  };

  const exportCSV = () => {
    const headers = [
      "Date", "Name", "Phone", "Email", "CNIC",
      "Service For", "Plan", "Address",
      "Additional Router", "Support Policy", "Equipment Policies",
    ];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toLocaleString(),
      s.name, s.phone, s.email, s.cnic,
      s.service_for, s.plan, s.address,
      s.additional_router, s.support_policy, s.equipment_policies,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `connections_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  const filtered = submissions
    .filter((s) => {
      const matchSearch = [s.name, s.phone, s.email, s.cnic, s.address]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchService = filterService === "All" || s.service_for === filterService;
      const matchPlan = filterPlan === "All" || s.plan === filterPlan;
      return matchSearch && matchService && matchPlan;
    })
    .sort((a, b) => {
      const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });

  const uniquePlans = Array.from(new Set(submissions.map((s) => s.plan)));

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Connection Requests</h1>
            <p className="text-muted-foreground">All submitted new connection forms</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {[
              { label: "Total", value: submissions.length },
              { label: "Home", value: submissions.filter((s) => s.service_for === "Home").length },
              { label: "Office", value: submissions.filter((s) => s.service_for === "Office").length },
              { label: "Shop", value: submissions.filter((s) => s.service_for === "Shop").length },
            ].map((stat) => (
              <Card key={stat.label} className="p-4 text-center glass">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 max-w-6xl mx-auto mb-6">
            <Input
              placeholder="Search name, phone, email, CNIC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-xs bg-white text-black"
            />
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="rounded-md border border-input bg-white text-black px-3 py-2 text-sm shadow-sm focus:outline-none"
            >
              <option value="All">All Services</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Shop">Shop</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="rounded-md border border-input bg-white text-black px-3 py-2 text-sm shadow-sm focus:outline-none"
            >
              <option value="All">All Plans</option>
              {uniquePlans.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="rounded-md border border-input bg-white text-black px-3 py-2 text-sm shadow-sm focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <div className="flex items-center gap-3 sm:ml-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {filtered.length} record{filtered.length !== 1 ? "s" : ""}
              </span>
              <Button onClick={exportCSV} variant="outline" disabled={filtered.length === 0}>
                Export CSV
              </Button>
              <Button onClick={fetchSubmissions} variant="outline">
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-500 border-red-300 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No submissions found.</p>
          ) : (
            <div className="grid gap-5 max-w-6xl mx-auto">
              {filtered.map((s, index) => (
                <Card key={s.id} className="p-6 glass">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                        {filtered.length - index}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold leading-tight">{s.name}</h2>
                        <p className="text-xs text-muted-foreground">
                          {new Date(s.created_at).toLocaleString("en-PK", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge label={s.service_for} colorClass={SERVICE_COLOR[s.service_for]} />
                      <Badge label={s.plan} colorClass={PLAN_COLOR[s.plan]} />
                      <Badge
                        label={s.additional_router.startsWith("Yes") ? "Extra Router" : "No Extra Router"}
                        colorClass={s.additional_router.startsWith("Yes") ? "bg-rose-100 text-rose-700" : "bg-gray-100 text-gray-500"}
                      />
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        className="ml-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === s.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <Detail label="Phone" value={s.phone} />
                    <Detail label="Email" value={s.email} />
                    <Detail label="CNIC" value={s.cnic} />
                    <Detail label="Address" value={s.address} />
                    <Detail label="Equipment Policies" value={s.equipment_policies} fullWidth />
                    <Detail label="Support Policy" value={s.support_policy} fullWidth />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}