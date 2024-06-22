import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function EmptyOrg() {
  return (
    <div className="h-full flex flex-col gap-4 relative items-center justify-center">
      <h3 className="font-semibold text-4xl">Welcome to Miro</h3>
      <p className="text-muted-foreground text-base">
        Create an organization to get started
      </p>
      <div className="mt-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="default">Create organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
