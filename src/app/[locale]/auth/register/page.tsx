"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker, message } from "antd";
import { PhoneOutlined, MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../../graphQL/mutation/auth";
import useAuthStore from "../../../../hooks/useAuthStore";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";

const { Option } = Select;

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({});
  const { setToken } = useAuthStore();
  const router = useRouter();

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      setToken(data.register.token);
      message.success("Registro exitoso");
      router.push("/es");
    },
    onError: (error) => {
      message.error("Error en el registro: " + error.message);
    },
  });

  const nextStep = () => {
    form.validateFields().then((values) => {
      setFormData({ ...formData, ...values });
      setCurrentStep(currentStep + 1);
      form.resetFields();
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = (values: any) => {
    const finalData = { ...formData, ...values };
    register({
      variables: {
        registerInput: {
          phone: finalData.countryCode + finalData.phone,
          email: finalData.email,
          firstName: finalData.firstName,
          lastName: finalData.lastName,
          documentType: finalData.documentType,
          documentNumber: finalData.documentNumber,
          birthDate: finalData.birthDate?.format("YYYY-MM-DD"),
          password: finalData.password,
        },
      },
    });
  };

  const steps = [
    {
      title: "Teléfono",
      content: (
        <Form form={form} layout="vertical" onFinish={nextStep}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">Ingresa tu número de teléfono</h3>
          </div>
          <Form.Item
            name="countryCode"
            label="Código de país"
            rules={[{ required: true, message: "Selecciona el código de país" }]}
            initialValue="+57"
          >
            <Select size="large">
              <Option value="+57">🇨🇴 +57 (Colombia)</Option>
              <Option value="+1">🇺🇸 +1 (USA)</Option>
              <Option value="+52">🇲🇽 +52 (México)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Número de teléfono"
            rules={[
              { required: true, message: "Ingresa tu número de teléfono" },
              { pattern: /^[0-9]{10}$/, message: "Ingresa un número válido de 10 dígitos" },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="3001234567" size="large" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Verificación",
      content: (
        <Form form={form} layout="vertical" onFinish={nextStep}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">Verifica tu número</h3>
            <p className="text-gray-600">Enviamos un código SMS a {formData.countryCode}{formData.phone}</p>
          </div>
          <Form.Item
            name="smsCode"
            label="Código de verificación"
            rules={[
              { required: true, message: "Ingresa el código de verificación" },
              { len: 6, message: "El código debe tener 6 dígitos" },
            ]}
          >
            <Input placeholder="123456" size="large" maxLength={6} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Email",
      content: (
        <Form form={form} layout="vertical" onFinish={nextStep}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">Ingresa tu correo electrónico</h3>
          </div>
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              { required: true, message: "Ingresa tu correo electrónico" },
              { type: "email", message: "Ingresa un correo válido" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="correo@ejemplo.com" size="large" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Datos Personales",
      content: (
        <Form form={form} layout="vertical" onFinish={nextStep}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">Completa tus datos personales</h3>
          </div>
          <Form.Item
            name="firstName"
            label="Nombres"
            rules={[{ required: true, message: "Ingresa tus nombres" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Juan Carlos" size="large" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Apellidos"
            rules={[{ required: true, message: "Ingresa tus apellidos" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Pérez García" size="large" />
          </Form.Item>
          <Form.Item
            name="documentType"
            label="Tipo de documento"
            rules={[{ required: true, message: "Selecciona el tipo de documento" }]}
          >
            <Select size="large" placeholder="Selecciona">
              <Option value="CC">Cédula de Ciudadanía</Option>
              <Option value="CE">Cédula de Extranjería</Option>
              <Option value="PP">Pasaporte</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="documentNumber"
            label="Número de documento"
            rules={[{ required: true, message: "Ingresa tu número de documento" }]}
          >
            <Input placeholder="12345678" size="large" />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Fecha de nacimiento"
            rules={[{ required: true, message: "Selecciona tu fecha de nacimiento" }]}
          >
            <DatePicker size="large" placeholder="Selecciona fecha" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Contraseña",
      content: (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">Crea tu contraseña</h3>
          </div>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "Ingresa tu contraseña" },
              { min: 8, message: "La contraseña debe tener al menos 8 caracteres" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmar contraseña"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirma tu contraseña" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Las contraseñas no coinciden"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirmar contraseña" size="large" />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <>
      <Header sidebarOpen={false} setSidebarOpen={() => {}} showMenu={false} />
      <Breadcrumb items={[
        { label: "Inicio", href: "/es" },
        { label: "Registro" }
      ]} />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Image
              src="/images/logotext.svg"
              alt="Logo"
              width={150}
              height={40}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className={`flex-1 text-center ${index === currentStep ? 'text-primary font-semibold' : 'text-gray-400'
                  }`}>
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${index === currentStep ? 'bg-primary text-white' : 'bg-gray-200'
                    }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            {steps[currentStep].content}
          </div>

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button onClick={prevStep} size="large">
                Anterior
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="primary" onClick={() => form.submit()} size="large" className="ml-auto bg-primary border-primary">
                Siguiente
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={loading}
                size="large"
                className="ml-auto bg-primary border-primary"
              >
                Crear Cuenta
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;