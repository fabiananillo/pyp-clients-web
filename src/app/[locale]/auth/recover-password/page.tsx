"use client";
import { Button, Form, Input } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { MutationFunction, useMutation, useQuery } from "@apollo/client";
import { RECOVERPASSWORDVALIDATION } from "@/graphQL/query/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { NEWPASSWORD } from "@/graphQL/mutation/auth";
import useLocaleStore from "@/hooks/useLocale";
import esMessages from "@/locale/es.json";
import enMessages from "@/locale/en.json";

const RecoverPassword: React.FC = () => {
  const router = useRouter();
  const { currentLocale } = useLocaleStore();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<any>();
  const recoverPasswordValidation = useQuery(RECOVERPASSWORDVALIDATION, {
    variables: {
      recoverPasswordValidationInput: {
        r: searchParams.get("r"),
        t: searchParams.get("t"),
      },
    },
  });

  const { data, loading, error } = recoverPasswordValidation;

  const [updatePassword, { loading: loadingUpdate }] =
    useMutation<MutationFunction>(NEWPASSWORD, {
      onCompleted: () => {
        router.push(`/${currentLocale}/auth/signin`);
      },
    });

  useEffect(() => {
    setMessages(currentLocale === "es" ? esMessages : enMessages);
    if (error) {
      router.push(`/${currentLocale}/auth/signin`);
    }
    if (!loading) {
      if (
        !searchParams.get("t") ||
        !searchParams.get("r") ||
        !data?.recoverPasswordValidation?.isValid
      ) {
        router.push(`/${currentLocale}/auth/signin`);
      }
    }
  }, [searchParams, data, loading, error, router, currentLocale, messages]);

  const [form] = useForm();

  const onFinish: FormProps["onFinish"] = () => {
    form.validateFields().then(({ newPassword }) => {
      void updatePassword({
        variables: {
          newPasswordInput: {
            newPassword,
            passwordResetToken: searchParams.get("t"),
            userId: searchParams.get("r"),
          },
        },
      });
    });
  };

  return (
    <section className="flex h-full w-full flex-col overflow-auto  bg-black">
      <div className="mt-[110px] flex h-full flex-row items-center justify-center">
        <Form
          className="mx-auto"
          onFinish={onFinish}
          form={form}
          name="changePassword"
          autoComplete="off"
        >
          <label
            className="mb-3 block text-sm font-bold text-white"
            htmlFor="newPassword"
          >
            {`${messages?.Security?.formNewPassword}`}
          </label>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: `${messages?.Forms?.emptyInput}`,
              },
            ]}
          >
            <Input.Password
              size="large"
              className="form-input h-[50px]"
              autoComplete="off"
            />
          </Form.Item>

          <label
            className="mb-3 block text-sm font-bold text-white"
            htmlFor="confirmPassword"
          >
            {`${messages?.Security?.formRepeatPassword}`}
          </label>
          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: `${messages?.Forms?.emptyInput}`,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(`${messages?.Security?.passwordMatch}`);
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              className="form-input h-[50px]"
              autoComplete="off"
            />
          </Form.Item>
          <div className="flex w-full justify-center pt-6">
            <Button
              loading={loadingUpdate || loading}
              block
              type="primary"
              size="large"
              htmlType="submit"
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            >
              {messages?.Button?.save}
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default RecoverPassword;
