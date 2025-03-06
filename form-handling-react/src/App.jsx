import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div>
      <h1>Controlled Component Form</h1>
      <RegistrationForm />

      <h1>Formik Form</h1>
      <FormikForm />
    </div>
  );
}

export default App;
