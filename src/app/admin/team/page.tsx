'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { getAdminTeam, saveAdminMember, revokeAdminMember } from '@/lib/db/store';
import { AdminMember, AdminPermissions } from '@/types';
import {
  Shield,
  ShieldCheck,
  UserPlus,
  UserX,
  Mail,
  User,
  CheckCircle2,
  AlertTriangle,
  Clock,
  KeyRound,
  Lock,
} from 'lucide-react';

export default function AdminTeamPage() {
  const { isOwner, adminUser } = useAuth();
  const [team, setTeam] = useState<AdminMember[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'admin'>('admin');
  const [permissions, setPermissions] = useState<AdminPermissions>({
    canManageProducts: true,
    canManageOrders: true,
    canManageInventory: true,
    canManageCoupons: true,
    canManageSettings: false,
    canManageTeam: false,
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setTeam(getAdminTeam());
  }, []);

  const refreshTeam = () => {
    setTeam(getAdminTeam());
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newName) return;

    const newMember: AdminMember = {
      id: `adm-${Date.now()}`,
      email: newEmail.trim().toLowerCase(),
      fullName: newName.trim(),
      role: newRole,
      status: 'active',
      permissions,
      invitedBy: adminUser?.email || 'owner@shokhora.com',
      createdAt: new Date().toISOString(),
    };

    saveAdminMember(newMember);
    refreshTeam();
    setModalOpen(false);
    setNewEmail('');
    setNewName('');
    setMessage(`Administrator access successfully granted to ${newMember.fullName}.`);
    setTimeout(() => setMessage(null), 4000);
  };

  const handleRevoke = (id: string, name: string) => {
    if (confirm(`Are you sure you want to revoke admin permissions for ${name}? They will immediately lose access to the admin dashboard.`)) {
      revokeAdminMember(id);
      refreshTeam();
      setMessage(`Access revoked for ${name}.`);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleReactivate = (member: AdminMember) => {
    saveAdminMember({ ...member, status: 'active' });
    refreshTeam();
    setMessage(`Access reactivated for ${member.fullName}.`);
    setTimeout(() => setMessage(null), 3000);
  };

  // If not owner, deny access
  if (!isOwner) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-taupe-200 shadow-sm max-w-xl mx-auto my-12 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-serif font-bold text-charcoal-950">
          Owner-Only Administration Area
        </h2>
        <p className="text-xs text-charcoal-500 leading-relaxed">
          Only the website owner has permission to invite administrative staff, grant dashboard access, and manage security roles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-charcoal-950">
              Admin Team & Permissions
            </h1>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-300">
              Owner Control
            </span>
          </div>
          <p className="text-xs text-charcoal-500 mt-1">
            Grant, modify, or revoke private dashboard access for staff members.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <UserPlus className="w-4 h-4 text-sage-400" />
          <span>Grant New Admin Access</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Team Table */}
      <div className="bg-white rounded-3xl border border-taupe-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-taupe-50/80 border-b border-taupe-200 text-charcoal-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Staff Member</th>
                <th className="py-3.5 px-6">Assigned Role</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Granted Permissions</th>
                <th className="py-3.5 px-6">Invited / Created</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100 font-medium text-charcoal-800">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-ivory-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-taupe-100 text-charcoal-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        {member.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-charcoal-900">{member.fullName}</p>
                        <p className="text-[11px] text-charcoal-500 font-mono">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        member.role === 'owner'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-sage-100 text-sage-800 border border-sage-200'
                      }`}
                    >
                      {member.role === 'owner' ? 'Store Owner' : 'Staff Admin'}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        member.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          member.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                      <span className="capitalize">{member.status}</span>
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {member.role === 'owner' ? (
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                          Full Store Control
                        </span>
                      ) : (
                        <>
                          {member.permissions?.canManageProducts && (
                            <span className="text-[10px] bg-taupe-100 text-charcoal-700 px-1.5 py-0.5 rounded">
                              Products
                            </span>
                          )}
                          {member.permissions?.canManageOrders && (
                            <span className="text-[10px] bg-taupe-100 text-charcoal-700 px-1.5 py-0.5 rounded">
                              Orders
                            </span>
                          )}
                          {member.permissions?.canManageInventory && (
                            <span className="text-[10px] bg-taupe-100 text-charcoal-700 px-1.5 py-0.5 rounded">
                              Inventory
                            </span>
                          )}
                          {member.permissions?.canManageCoupons && (
                            <span className="text-[10px] bg-taupe-100 text-charcoal-700 px-1.5 py-0.5 rounded">
                              Coupons
                            </span>
                          )}
                          {member.permissions?.canManageSettings && (
                            <span className="text-[10px] bg-taupe-100 text-charcoal-700 px-1.5 py-0.5 rounded">
                              Settings
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6 text-charcoal-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-taupe-400" />
                      <span>{new Date(member.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right">
                    {member.role !== 'owner' && (
                      member.status === 'active' ? (
                        <button
                          onClick={() => handleRevoke(member.id, member.fullName)}
                          className="px-3 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-semibold transition-colors"
                        >
                          Revoke Access
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReactivate(member)}
                          className="px-3 py-1 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-[11px] font-semibold transition-colors"
                        >
                          Reactivate
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grant Admin Access Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-taupe-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-taupe-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sage-600" />
                <h3 className="text-lg font-serif font-bold text-charcoal-950">
                  Grant Administrator Access
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-charcoal-400 hover:text-charcoal-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                  Staff Member Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhan Ahmed"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-2 focus:ring-charcoal-900 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                  Authorized Admin Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="farhan@shokhora.com or staff@gmail.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-2 focus:ring-charcoal-900 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Permissions Checkboxes */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                  Assign Permissions
                </label>
                <div className="space-y-2 bg-taupe-50 p-3.5 rounded-xl border border-taupe-200 text-xs">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.canManageProducts}
                      onChange={(e) =>
                        setPermissions({ ...permissions, canManageProducts: e.target.checked })
                      }
                      className="rounded text-charcoal-900 focus:ring-0"
                    />
                    <span className="font-medium text-charcoal-800">
                      Product Management (Add, edit, delete, publish products)
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.canManageOrders}
                      onChange={(e) =>
                        setPermissions({ ...permissions, canManageOrders: e.target.checked })
                      }
                      className="rounded text-charcoal-900 focus:ring-0"
                    />
                    <span className="font-medium text-charcoal-800">
                      Order Processing & bKash/Nagad Payment Verification
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.canManageInventory}
                      onChange={(e) =>
                        setPermissions({ ...permissions, canManageInventory: e.target.checked })
                      }
                      className="rounded text-charcoal-900 focus:ring-0"
                    />
                    <span className="font-medium text-charcoal-800">
                      Inventory Management (Stock In, Stock Out, stock audits)
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.canManageCoupons}
                      onChange={(e) =>
                        setPermissions({ ...permissions, canManageCoupons: e.target.checked })
                      }
                      className="rounded text-charcoal-900 focus:ring-0"
                    />
                    <span className="font-medium text-charcoal-800">
                      Coupon Management (Create & edit discount codes)
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.canManageSettings}
                      onChange={(e) =>
                        setPermissions({ ...permissions, canManageSettings: e.target.checked })
                      }
                      className="rounded text-charcoal-900 focus:ring-0"
                    />
                    <span className="font-medium text-charcoal-800">
                      Store Settings & Merchant Account Numbers
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-taupe-300 text-xs font-semibold text-charcoal-700 hover:bg-taupe-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-900 shadow-sm"
                >
                  Confirm & Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
