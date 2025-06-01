import { useForm, type SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import {
  type CreateUpdateModalFields,
  type UpdateProjectModalProps,
} from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUpdateSchema } from "../../lib/schemas";
import { useUpdateProject } from "../../hooks/mutations/useUpdateProject";

export default function UpdateProjectModal({
  setIsModalOpen,
  project,
}: UpdateProjectModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUpdateModalFields>({
    resolver: zodResolver(CreateUpdateSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
    },
  });

  const updateMutation = useUpdateProject();

  const onSubmit: SubmitHandler<CreateUpdateModalFields> = async (data) => {
    updateMutation.mutate({ ...data, id: project.id });
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex h-full w-full bg-[var(--widjet)]/90 items-center justify-center overflow-y-auto">
      <div className="relative w-96 rounded-md p-8 shadow-2xl bg-[var(--widjet)]">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Update a Project</h3>
          <div className="mt-2 px-7 py-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2.5"
            >
              <input
                type="text"
                {...register("title")}
                placeholder="Title"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />
              {errors.title && (
                <div className="text-red-400">{errors.title.message}</div>
              )}

              <input
                type="text"
                {...register("description")}
                placeholder="Description"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />
              {errors.description && (
                <div className="text-red-400">{errors.description.message}</div>
              )}

              <button
                type="submit"
                className="text-md mt-6 cursor-pointer rounded-md px-6 py-2 duration-500 hover:bg-amber-600"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </form>
            <div className="absolute top-2 right-2">
              <IoClose
                onClick={() => setIsModalOpen(false)}
                className="h-6 w-6 cursor-pointer duration-500 hover:text-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
