import { useMemo } from "react"

import { Link, useParams, useSearchParams } from "react-router-dom"

import { useRoles } from "@/hooks/use-roles"

import {
  Globe,
  Plus,
  ShieldCheck,
  UserShield,
  PencilLine,
  Eye,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

export default function WebsiteRolesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const params = useParams()
  const { id: websiteId } = params

  const { roles, meta, isLoading } = useRoles(currentPage, websiteId)

  const handlePageChange = (newPage: number) => {
    if (
      newPage === currentPage ||
      newPage < 1 ||
      (meta?.last_page && newPage > meta.last_page)
    ) {
      return
    }
    setSearchParams((prev) => {
      prev.set("page", String(newPage))
      return prev
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const paginationRange = useMemo(() => {
    const totalPages = meta?.last_page || 1
    const delta = 1
    const range: (number | string)[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      range.unshift("ellipsis-start")
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("ellipsis-end")
    }

    range.unshift(1)
    if (totalPages > 1) {
      range.push(totalPages)
    }

    return range
  }, [currentPage, meta?.last_page])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">سطوح دسترسی</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            این قسمت مربوط به مدیریت سطوح دسترسی و نقش های وبسایت شما می باشد.
            ازین قسمت می توانید نقش های جدید ایجاد کنید و به اوپراتورهای خود
            اختصاص دهید.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={
            <Link to={`/dashboard/websites/${websiteId}/roles/create`}>
              ایجاد دسترسی جدید
            </Link>
          }
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between border bg-card/60"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2.5">
                      <Skeleton className="size-10 shrink-0 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="size-8 shrink-0 rounded-md" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-1 pb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-muted/40 p-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </div>

              <CardFooter className="grid grid-cols-2 gap-2 border-t px-4 pt-4 pb-4">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))}

        {!isLoading &&
          roles?.map((role) => (
            <Card
              key={role.id}
              className="group relative flex flex-col justify-between border bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="truncate text-base font-bold transition-colors group-hover:text-primary">
                          {role.name}
                        </CardTitle>
                        <CardDescription className="mt-0.5 flex items-center gap-1.5 truncate text-xs">
                          <p className="truncate">{role.description}</p>
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-1 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 border-emerald-500/20 bg-emerald-500/10 text-xs font-normal text-emerald-600 dark:text-emerald-400"
                    >
                      <ShieldCheck />
                      {!role.website ? (
                        <span>نقش سیستمی</span>
                      ) : (
                        <span>نقش سفارشی</span>
                      )}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-muted/40 p-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <UserShield className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">اپراتورها:</span>
                      <span className="font-semibold">
                        {role.operators?.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">دسترسی‌ها:</span>
                      <span className="font-semibold">
                        {role.permissions.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>

              <CardFooter
                className={`grid ${role.website ? "grid-cols-2" : ""} gap-2 border-t px-4 pt-4 pb-4`}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xs"
                  nativeButton={false}
                  render={
                    <Link
                      to={`/dashboard/websites/${websiteId}/roles/${role.id}/show`}
                    >
                      <Eye className="size-3.5 shrink-0" />
                      <span>مشاهده</span>
                    </Link>
                  }
                />

                {role.website && (
                  <Button
                    size="lg"
                    className="min-w-0 gap-1.5 text-xs"
                    nativeButton={false}
                    render={
                      <Link
                        to={`/dashboard/websites/${websiteId}/roles/${role.id}/edit`}
                      >
                        <PencilLine className="size-3.5 shrink-0" />
                        <span>ویرایش</span>
                      </Link>
                    }
                  />
                )}
              </CardFooter>
            </Card>
          ))}
      </div>

      {!isLoading && roles?.length === 0 && (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-muted p-4">
            <Globe className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold">هیچ نقشی یافت نشد</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            هنوز نقشی اضافه نکرده‌اید. با کلیک بر روی دکمه زیر اولین وب‌سایت خود
            را ایجاد کنید.
          </p>
          <Button className="mt-4 gap-2" size="lg">
            <Plus className="h-4 w-4" />
            افزودن نقش جدید
          </Button>
        </Card>
      )}

      {!isLoading && meta && meta.last_page > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            نمایش{" "}
            <span className="font-medium text-foreground">
              {(meta.current_page - 1) * meta.per_page + 1}
            </span>{" "}
            تا{" "}
            <span className="font-medium text-foreground">
              {Math.min(meta.current_page * meta.per_page, meta.total)}
            </span>{" "}
            از <span className="font-medium text-foreground">{meta.total}</span>{" "}
            نقش
          </p>

          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              {paginationRange.map((pageItem, index) => {
                if (typeof pageItem === "string") {
                  return (
                    <PaginationItem key={pageItem + index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }

                return (
                  <PaginationItem key={pageItem}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageItem}
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(pageItem)
                      }}
                      className="cursor-pointer"
                    >
                      {pageItem}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
