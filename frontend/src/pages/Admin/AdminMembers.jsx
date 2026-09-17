import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminDashboardHeader from "../../components/layout/Admin/AdminDashboardHeader";
import AdminSidebar from "../../components/layout/Admin/AdminSidebar";
import {
  getAllMembers,
  deleteMember,
} from "../../services/admin/memberManagementService";

function AdminMembers() {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);


  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await getAllMembers();

      if (response.success) {
        setMembers(response.data);
      }
    } catch (error) {
      console.error("Members error:", error);
      toast.error(error.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    const timer = setTimeout(() => {
      fetchMembers();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (memberId, memberName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${memberName}? This will also delete their membership, payment, and diet plan records.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(memberId);

      const response = await deleteMember(memberId);

      if (response.success) {
        setMembers((currentMembers) =>
          currentMembers.filter((member) => member.id !== memberId)
        );

        toast.success("Member deleted successfully");
      }
    } catch (error) {
      console.error("Delete member error:", error);
      toast.error(error.message || "Failed to delete member");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app-page min-h-screen">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex-1 min-w-0">
          <AdminDashboardHeader
            title="Member Management"
            description="View and manage registered gym members."
          />

          <main className="page-enter p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Page intro */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold">
                  <span>◉</span>
                  Members
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  Manage Members
                </h1>

                <p className="mt-2 text-slate-500 max-w-2xl">
                  View registered members, membership information, and manage
                  member accounts.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="glass-card soft-shadow rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Total Members</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loading ? "..." : members.length}
                  </p>
                </div>

                <div className="glass-card soft-shadow rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Active Members</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loading
                      ? "..."
                      : members.filter((member) =>
                          member.memberships?.some(
                            (membership) => membership.status === "ACTIVE"
                          )
                        ).length}
                  </p>
                </div>

                <div className="glass-card soft-shadow rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Without Membership</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loading
                      ? "..."
                      : members.filter(
                          (member) => !member.memberships?.length
                        ).length}
                  </p>
                </div>
              </div>

              {/* Members table */}
              <div className="glass-card soft-shadow rounded-3xl overflow-hidden">
                <div className="px-5 sm:px-6 py-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Registered Members
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      All normal user accounts registered in the system.
                    </p>
                  </div>

                  <button
                    onClick={fetchMembers}
                    disabled={loading}
                    className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Refresh"}
                  </button>
                </div>

                {loading ? (
                  <div className="p-6 space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-16 rounded-xl skeleton"
                      />
                    ))}
                  </div>
                ) : members.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                      ◉
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      No members found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      There are currently no registered USER accounts.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200">
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            Member
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            Email
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            Membership
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                            Joined
                          </th>

                          <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {members.map((member) => {
                          const activeMembership = member.memberships?.find(
                            (membership) => membership.status === "ACTIVE"
                          );

                          return (
                            <tr
                              key={member.id}
                              className="hover:bg-slate-50/70 transition"
                            >
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                                    {member.name
                                      ?.charAt(0)
                                      .toUpperCase() || "U"}
                                  </div>

                                  <div>
                                    <p className="font-semibold text-slate-900">
                                      {member.name}
                                    </p>

                                    <p className="text-xs text-slate-400 mt-0.5">
                                      ID #{member.id}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-5 text-sm text-slate-600">
                                {member.email}
                              </td>

                              <td className="px-6 py-5">
                                {activeMembership ? (
                                  <div>
                                    <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                      Active
                                    </span>

                                    <p className="mt-1.5 text-sm text-slate-600">
                                      {activeMembership.plan?.name ||
                                        "Membership"}
                                    </p>
                                  </div>
                                ) : (
                                  <span className="inline-flex px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                                    No active membership
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-5 text-sm text-slate-600">
                                {new Date(
                                  member.createdAt
                                ).toLocaleDateString()}
                              </td>

                              <td className="px-6 py-5 text-right">
                                <button
                                  onClick={() =>
                                    handleDelete(member.id, member.name)
                                  }
                                  disabled={deletingId === member.id}
                                  className="px-3.5 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50"
                                >
                                  {deletingId === member.id
                                    ? "Deleting..."
                                    : "Delete"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Warning */}
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3">
                  <span className="text-amber-600">!</span>

                  <div>
                    <p className="text-sm font-semibold text-amber-900">
                      Member deletion
                    </p>

                    <p className="mt-1 text-sm text-amber-700">
                      Deleting a member permanently removes their membership,
                      payment, and diet-plan records from the database.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminMembers;