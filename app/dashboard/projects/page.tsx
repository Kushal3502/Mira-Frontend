"use client";

import { FolderIcon, PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          <p className="text-muted-foreground">
            Manage and organize your projects
          </p>
        </div>
        <Button>
          <PlusIcon className="size-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Project Cards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <FolderIcon className="size-5 text-primary" />
              <CardTitle>Project Name</CardTitle>
            </div>
            <CardDescription>Project description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Last updated: 2 days ago
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <FolderIcon className="size-5 text-primary" />
              <CardTitle>Another Project</CardTitle>
            </div>
            <CardDescription>Another project description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Last updated: 1 week ago
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <FolderIcon className="size-5 text-primary" />
              <CardTitle>Third Project</CardTitle>
            </div>
            <CardDescription>Third project description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Last updated: 3 days ago
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State (when no projects) */}
      {/* <div className="flex flex-col items-center justify-center py-12 text-center">
        <FolderIcon className="size-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground mb-4">
          Get started by creating your first project
        </p>
        <Button>
          <PlusIcon className="size-4" />
          Create Project
        </Button>
      </div> */}
    </div>
  );
}
