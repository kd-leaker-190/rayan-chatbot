import type { KeyedMutator } from "swr"

import type { IApiResponse } from "@/contracts/api"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import WelcomWidgetSkeleton from "@/components/dashboard/skeletons/welcome-widget"
import CreateWebsiteDialogWidget from "@/components/dashboard/widgets/create-website-dialog"

interface IProps {
  user?: IUser
  isLoading: boolean
  hasWebsite: boolean | null
  mutateWebsite: KeyedMutator<IApiResponse<IHasWebsiteStatus>>
}

export default function Welcome({
  user,
  isLoading,
  hasWebsite,
  mutateWebsite,
}: IProps) {
  return (
    <>
      {isLoading ? (
        <WelcomWidgetSkeleton />
      ) : (
        <Card>
          <CardContent className="space-y-3">
            <h1 className="text-xl font-bold sm:text-2xl">داشبورد</h1>

            <p className="text-sm text-muted-foreground">
              {user?.first_name} {user?.last_name} عزیز به رایان‌چت خوش آمدید 👋
            </p>

            {hasWebsite === false && (
              <>
                <Separator />

                <p className="text-sm text-muted-foreground">
                  هنوز وبسایتی ندارید، برای شروع کار با رایان چت اطلاعات وبسایت
                  خود را تکمیل کنید.
                </p>

                <CreateWebsiteDialogWidget mutateWebsite={mutateWebsite} />
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}
