import prisma from "@/utils/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          porfileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}
const RecentSales = async () => {
  const data = await getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <Avatar className="hidden sm:flex h-9 w-9">
              <AvatarImage src={item.User?.porfileImage} alt="Avatar Image" />
              <AvatarFallback>
                {item.User?.firstName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">{item.User?.firstName}</p>
              <p className="text-sm text-muted-foreground">
                {(item.User?.email.length as number) >= 23
                  ? item.User?.email.slice(0, 23) + "..."
                  : item.User?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              EGP {new Intl.NumberFormat("en-Us").format(item.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentSales;
