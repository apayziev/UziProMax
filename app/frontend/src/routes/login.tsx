import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

import type { Body_login_access_token as AccessToken } from "@/client"
import { AuthLayout } from "@/components/Common/AuthLayout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { PasswordInput } from "@/components/ui/password-input"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/useLanguage"

const formSchema = z.object({
  username: z.string().min(9, { message: "Telefon raqamini kiriting" }),
  password: z
    .string()
    .min(1, { message: "Parol kiritilishi shart" })
    .min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }),
})

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
  head: () => ({
    meta: [
      {
        title: "Kirish - UziProMax",
      },
    ],
  }),
})

function Login() {
  const { loginMutation } = useAuth()
  const { t } = useLanguage()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: FormData) => {
    if (loginMutation.isPending) return
    loginMutation.mutate(data)
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <img src="/assets/images/favicon.png" alt="UziProMax" className="h-20 w-auto rounded-xl lg:hidden" />
            <h1 className="text-3xl font-bold">{t("welcome")}</h1>
            <p className="text-muted-foreground">{t("login_subtitle")}</p>
          </div>

          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t("phone")}</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="phone-input"
                      placeholder={t("phone_placeholder")}
                      type="tel"
                      className="h-12 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel className="text-base">{t("password")}</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput
                      data-testid="password-input"
                      placeholder={t("password_placeholder")}
                      className="h-12 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <LoadingButton type="submit" loading={loginMutation.isPending} className="h-12 text-base font-semibold">
              {t("login")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
