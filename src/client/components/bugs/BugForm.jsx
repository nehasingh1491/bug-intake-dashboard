import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  areaOptions,
  priorityOptions,
  statusOptions,
} from "../../constants/bugOptions";

const bugSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(160, "Title must be 160 characters or fewer")
    .required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
  status: Yup.string()
    .oneOf(statusOptions.map((status) => status.value))
    .required("Status is required"),
  priority: Yup.string()
    .oneOf(priorityOptions.map((priority) => priority.value))
    .required("Priority is required"),
  assignedTo: Yup.string().trim().required("Assignee is required"),
  area: Yup.string()
    .oneOf(areaOptions.map((area) => area.value))
    .required("Area is required"),
  stepsToReproduce: Yup.string()
    .trim()
    .required("Steps to reproduce are required"),
});

const initialBugValues = {
  title: "",
  description: "",
  status: "open",
  priority: "medium",
  assignedTo: "",
  area: "frontend",
  stepsToReproduce: "",
};

const textFieldProps = (name, touched, errors) => ({
  name,
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name] ? errors[name] : " ",
});

const BugForm = ({ initialValues = initialBugValues, onSubmit, submitLabel }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bugSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="Title"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              required
              {...textFieldProps("title", touched, errors)}
            />

            <TextField
              label="Description"
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              required
              multiline
              minRows={3}
              {...textFieldProps("description", touched, errors)}
            />

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, minmax(0, 1fr))",
                },
              }}
            >
              <TextField
                select
                label="Status"
                value={values.status}
                onBlur={handleBlur}
                onChange={handleChange}
                required
                {...textFieldProps("status", touched, errors)}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Priority"
                value={values.priority}
                onBlur={handleBlur}
                onChange={handleChange}
                required
                {...textFieldProps("priority", touched, errors)}
              >
                {priorityOptions.map((priority) => (
                  <MenuItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Area"
                value={values.area}
                onBlur={handleBlur}
                onChange={handleChange}
                required
                {...textFieldProps("area", touched, errors)}
              >
                {areaOptions.map((area) => (
                  <MenuItem key={area.value} value={area.value}>
                    {area.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <TextField
              label="Assigned to"
              value={values.assignedTo}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              required
              {...textFieldProps("assignedTo", touched, errors)}
            />

            <TextField
              label="Steps to reproduce"
              value={values.stepsToReproduce}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              required
              multiline
              minRows={4}
              {...textFieldProps("stepsToReproduce", touched, errors)}
            />

            <Box>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={isSubmitting}
              >
                {submitLabel}
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default BugForm;
