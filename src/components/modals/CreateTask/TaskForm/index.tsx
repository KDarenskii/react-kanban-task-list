import React from "react";
import Button from "../../../buttons/Button";
import Input from "../../../formElements/Input";
import Label from "../../../formElements/Label";
import Select from "../../../formElements/Select";
import Textarea from "../../../formElements/Textarea";
import { FaTimes } from "react-icons/fa";
import { useForm, useFieldArray } from "react-hook-form";
import FieldError from "../../../formElements/FieldError";
import { ITask } from "../../../../models/types/Task";

export type TaskFormValues = {
    title: string;
    description: string;
    subtasks: { title: string }[];
    status: string;
};

type Props = {
    onSubmit: (data: TaskFormValues) => void;
    statuses: string[];
    task?: ITask;
    isEditingTask?: boolean;
};

const TaskForm: React.FC<Props> = ({ onSubmit, statuses, task, isEditingTask }) => {
    const defaultValues: TaskFormValues = {
        title: task?.title ?? "",
        description: task?.description ?? "",
        status: task?.status ?? statuses[0],
        subtasks: task?.subtasks.map((subtask) => ({ title: subtask.title })) ?? [{ title: "" }, { title: "" }],
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setFocus,
    } = useForm<TaskFormValues>({
        defaultValues,
        mode: "onBlur",
    });

    React.useEffect(() => {
        setFocus("title");
    }, [setFocus]);

    const { fields, remove, append } = useFieldArray({
        name: "subtasks",
        control,
    });

    const appendSubtask = () => {
        append({ title: "" });
    };

    const deleteSubtask = (event: React.MouseEvent, index: number) => {
        event.stopPropagation();
        remove(index);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Label text="Title" className="mb-5">
                <Input
                    {...register("title", { required: "Field is required" })}
                    placeholder="e.g. Take coffee break"
                    className="mb-1"
                />
                <FieldError>{errors.title?.message}</FieldError>
            </Label>
            <Label text="Description" className="mb-5">
                <Textarea
                    {...register("description")}
                    placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little"
                />
            </Label>
            <Label text="Subtasks">
                {fields.map((field, index) => (
                    <div className="flex gap-2 items-center" key={field.id}>
                        <Input
                            className="mb-2"
                            placeholder={index % 2 ? "e.g. Drink coffee & smile" : "e.g. Make coffee"}
                            {...register(`subtasks.${index}.title` as const)}
                        />
                        <FaTimes
                            className="w-5 h-6 fill-grey transition-colors hover:fill-black dark:hover:fill-white"
                            onClick={(event) => deleteSubtask(event, index)}
                        />
                    </div>
                ))}
            </Label>
            <Button type="button" className="mb-5 w-full" color="light" onClick={appendSubtask}>
                + Add New Subtask
            </Button>
            <Label text="Status" className="mb-5">
                <Select {...register("status")}>
                    {statuses.map((status, index) => (
                        <option key={status + index} value={status}>
                            {status}
                        </option>
                    ))}
                </Select>
            </Label>
            <Button className="w-full" type="submit">
                {isEditingTask ? "Save" : "Create task"}
            </Button>
        </form>
    );
};

export default TaskForm;
