"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ViewAllEmailsDialogProps {
    open: boolean;
    onClose: () => void;
    emails: string[];
}

const ViewAllEmailsDialog = ({ open, onClose, emails }: ViewAllEmailsDialogProps) => {
    const [copied, setCopied] = useState(false);

    const copyAllEmails = () => {
        const emailList = emails.join(", ");
        navigator.clipboard.writeText(emailList);
        setCopied(true);
        toast.success("All emails copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const copyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        toast.success(`Copied: ${email}`);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        All Guide Emails ({emails.length})
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-2 py-4">
                    {emails.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No guide emails found</p>
                    ) : (
                        emails.map((email, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-sm font-medium">{email}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyEmail(email)}
                                    className="ml-2"
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={copyAllEmails} disabled={emails.length === 0}>
                        {copied ? "Copied!" : "Copy All Emails"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewAllEmailsDialog;
