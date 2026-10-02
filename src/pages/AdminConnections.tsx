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
  cnic_front_url: string;
  cnic_back_url: string;
  plan: string;
  equipment_policies: string;
  additional_router: string;
  support_policy: string;
  equipment_details: string | null;
  equipment_cost: number | null;
  amount_paid: number | null;
};

const PLAN_COLOR: Record<string, string> = {
  "Rs. 22000 For Packages 6Mbps upto 16Mbps": "bg-blue-100 text-blue-700",
  "Rs. 35000 For Packages 20Mbps upto 50Mbps": "bg-purple-100 text-purple-700",
  FTTH: "bg-green-100 text-green-700",
  "Own Equipments": "bg-orange-100 text-orange-700",
  "Used Equipment": "bg-teal-100 text-teal-700",
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

// ─── Full-size image viewer ───────────────────────────────────────────────────
function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
    >
      <img
        src={src}
        alt="CNIC full view"
        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// ─── CNIC image thumbnail ─────────────────────────────────────────────────────
function CnicImage({
  label,
  url,
  onZoom,
}: {
  label: string;
  url: string;
  onZoom: (url: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      {url ? (
        <img
          src={url}
          alt={label}
          onClick={() => onZoom(url)}
          className="w-full h-32 object-cover rounded-md border border-input cursor-zoom-in hover:opacity-90 transition-opacity"
        />
      ) : (
        <div className="w-full h-32 rounded-md border border-dashed border-input flex items-center justify-center text-xs text-muted-foreground">
          Not uploaded
        </div>
      )}
    </div>
  );
}

// ─── Equipment & Payment (admin fills this) ───────────────────────────────────
function EquipmentSection({
  s,
  onSaved,
}: {
  s: Submission;
  onSaved: (id: string, updates: Partial<Submission>) => void;
}) {
  const [details, setDetails] = useState(s.equipment_details ?? "");
  const [cost, setCost] = useState(String(s.equipment_cost ?? 0));
  const [paid, setPaid] = useState(String(s.amount_paid ?? 0));
  const [newPayment, setNewPayment] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const remaining = (Number(cost) || 0) - (Number(paid) || 0);

  const saveToDb = async (updates: {
    equipment_details: string;
    equipment_cost: number;
    amount_paid: number;
  }) => {
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from("new_connection_requests")
      .update(updates)
      .eq("id", s.id);
    setSaving(false);
    if (error) {
      console.error(error);
      alert("Save failed. Check console / Supabase update policy.");
      return false;
    }
    onSaved(s.id, updates);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    return true;
  };

  const handleSave = () =>
    saveToDb({
      equipment_details: details,
      equipment_cost: Number(cost) || 0,
      amount_paid: Number(paid) || 0,
    });

  const handleAddPayment = async () => {
    const add = Number(newPayment) || 0;
    if (add <= 0) return;
    const total = (Number(paid) || 0) + add;
    const ok = await saveToDb({
      equipment_details: details,
      equipment_cost: Number(cost) || 0,
      amount_paid: total,
    });
    if (ok) {
      setPaid(String(total));
      setNewPayment("");
    }
  };

  const handleMarkPaid = async () => {
    const total = Number(cost) || 0;
    const ok = await saveToDb({
      equipment_details: details,
      equipment_cost: total,
      amount_paid: total,
    });
    if (ok) setPaid(String(total));
  };

  return (
    <div className="mt-5 pt-5 border-t border-input space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Equipment &amp; Payment (Admin)
        </p>
        {(Number(cost) || 0) > 0 && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              remaining <= 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {remaining <= 0 ? "Fully Paid" : "Pending"}
          </span>
        )}
      </div>

      <Input
        placeholder="Equipment given (e.g. Router, POE, 50m cable)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="bg-white text-black"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Equipment Cost (Rs.)</p>
          <Input
            type="number"
            min="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="bg-white text-black"
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Amount Paid (Rs.)</p>
          <Input
            type="number"
            min="0"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            className="bg-white text-black"
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Remaining (Rs.)</p>
          <div
            className={`h-10 flex items-center px-3 rounded-md border border-input text-sm font-bold ${
              remaining > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {remaining.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="sm:max-w-[200px]">
          <p className="text-xs text-muted-foreground mb-1">New Payment Received (Rs.)</p>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 1000"
            value={newPayment}
            onChange={(e) => setNewPayment(e.target.value)}
            className="bg-white text-black"
          />
        </div>
        <Button onClick={handleAddPayment} disabled={saving || !newPayment} variant="outline">
          Add Payment
        </Button>
        <Button
          onClick={handleMarkPaid}
          disabled={saving || remaining <= 0}
          variant="outline"
          className="text-green-600 border-green-300 hover:bg-green-50"
        >
          Mark Fully Paid
        </Button>
        <Button onClick={handleSave} disabled={saving} variant="outline" className="sm:ml-auto">
          {saving ? "Saving..." : "Save"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved ✓</span>}
      </div>
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
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

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

  const handleEquipmentSaved = (id: string, updates: Partial<Submission>) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
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
      "Equipment Given", "Equipment Cost", "Amount Paid", "Remaining",
      "CNIC Front URL", "CNIC Back URL",
    ];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toLocaleString(),
      s.name, s.phone, s.email, s.cnic,
      s.service_for, s.plan, s.address,
      s.additional_router, s.support_policy, s.equipment_policies,
      s.equipment_details ?? "",
      s.equipment_cost ?? 0,
      s.amount_paid ?? 0,
      (s.equipment_cost ?? 0) - (s.amount_paid ?? 0),
      s.cnic_front_url, s.cnic_back_url,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-5">
                    <Detail label="Phone" value={s.phone} />
                    <Detail label="Email" value={s.email} />
                    <Detail label="CNIC" value={s.cnic} />
                    <Detail label="Address" value={s.address} />
                    <Detail label="Equipment Policies" value={s.equipment_policies} fullWidth />
                    <Detail label="Support Policy" value={s.support_policy} fullWidth />
                  </div>

                  {/* CNIC Images */}
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <CnicImage label="CNIC Front" url={s.cnic_front_url} onZoom={setLightboxSrc} />
                    <CnicImage label="CNIC Back" url={s.cnic_back_url} onZoom={setLightboxSrc} />
                  </div>

                  {/* Equipment & Payment */}
                  <EquipmentSection s={s} onSaved={handleEquipmentSaved} />
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      <Footer />
    </div>
  );
}