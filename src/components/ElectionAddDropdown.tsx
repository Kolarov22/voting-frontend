import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ElectionAddDropdown = () => {
  return (
    <div className="w-1/2">
      <Accordion type="single" collapsible>
        <AccordionItem className="border-0" value="item-1">
          <AccordionTrigger className="justify-center">
            Add election
          </AccordionTrigger>
          <AccordionContent>
            <form className="space-y-4 py-2 flex flex-col gap-4">
              <div className="">
                <label htmlFor="name" className="text-sm font-medium">
                  Election Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Enter election name"
                />
              </div>

              <div className="">
                <label htmlFor="description" className="text-sm font-medium">
                  Election Description
                </label>
                <textarea
                  id="description"
                  className="w-full rounded-md border px-3 py-2 text-sm min-h-[100px]"
                  placeholder="Enter election description"
                />
              </div>

              <div className="">
                <label htmlFor="duration" className="text-sm font-medium">
                  Election Duration (seconds)
                </label>
                <input
                  id="duration"
                  type="number"
                  min="1"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Enter duration in seconds"
                />
              </div>

              <button
                type="submit"
                className="w-1/4 rounded-md bg-purple-cta px-4 py-2 text-sm font-medium text-white self-center whitespace-nowrap min-w-fit"
              >
                Create Election
              </button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ElectionAddDropdown;
