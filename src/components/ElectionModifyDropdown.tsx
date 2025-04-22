import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ElectionModifyDropdown = () => {
  return (
    <div className="w-1/2">
      <Accordion type="single" collapsible>
        <AccordionItem className="border-0" value="item-1">
          <AccordionTrigger className="justify-center">
            Interact with election
          </AccordionTrigger>
          <AccordionContent>
            <form className="space-y-4 py-2 flex flex-col gap-4">
              <div className="">
                <label htmlFor="address" className="text-sm font-medium">
                  Election Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Enter election address"
                />
              </div>

              <div className="">
                <label htmlFor="candidatesAdd" className="text-sm font-medium">
                  Add candidates
                </label>
                <input
                  id="candidatesAdd"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Enter new election candidates (comma separated)"
                />
              </div>

              <div className="">
                <label
                  htmlFor="candidatesRemove"
                  className="text-sm font-medium"
                >
                  Remove candidates
                </label>
                <input
                  id="candidatesRemove"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Enter election candidates to remove (comma separated)"
                />
              </div>

              <button
                type="submit"
                className="w-1/4 rounded-md bg-purple-cta px-4 py-2 text-sm font-medium text-white self-center whitespace-nowrap min-w-fit"
              >
                Edit Election
              </button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ElectionModifyDropdown;
