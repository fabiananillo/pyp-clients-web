"use client";
import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphQL/mutation/auth";
import useAuthStore from "../../hooks/useAuthStore";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setAuth(data.clientLogin.token, data.clientLogin.client);
      message.success("Inicio de sesión exitoso");
      onClose();
      form.resetFields();
    },
    onError: (error) => {
      message.error("Error al iniciar sesión: " + error.message);
    },
  });

  const handleSubmit = (values: any) => {
    login({
      variables: {
        loginInput: {
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  const handleRegisterClick = () => {
    onClose();
    router.push("/es/auth/register");
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      closable={false}
    >
      <div className="text-center mb-6">
        <Image
          src="/images/logotext.svg"
          alt="Logo"
          width={150}
          height={40}
          className="mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">
          Iniciar Sesión
        </h2>
      </div>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            { required: true, message: "Ingrese su correo electrónico" },
            { type: "email", message: "Ingrese un correo válido" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Correo electrónico"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: "Ingrese su contraseña" },
            { min: 6, message: "La contraseña debe tener al menos 6 caracteres" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Contraseña"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="bg-primary border-primary"
          >
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <Button type="link" onClick={handleRegisterClick} className="text-primary">
          ¿No tienes cuenta? Regístrate
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;