import IssueService from "@/api/services/IssueService";
import PullsService from "@/api/services/PullsService";
import BranchService from "@/api/services/BranchService";
import ProjectService from "@/api/services/ProjectService";
import { ModalHandler } from "@/util/modal/ModalHandler";
import ConfirmModal from "@/components/layout/modals/confirm/ConfirmModal.vue";
import { ConfirmModalModifications } from "@/components/layout/modals/confirm/ConfirmModalModifications";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
import { EchoError } from "echofetch";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { Project } from "@/api/models/Project";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import { Branch } from "@/api/models/Branch";
import { Optional } from "@/types/Optional";

export class FeatureUtil {
    /**
     * Feature/unfeature a given item.
     * @param item Item to feature.
     * @param type Type of item to feature.
     * @param confirm Should a confirm modal be shown.
     *
     * @returns Returns the feature promise when confirm is false.
     */
    static toggleFeatured(
        item: Project | Issue | Pull | Branch,
        type: "project" | "issue" | "pull" | "branch",
        confirm: boolean
    ): Optional<Promise<void>> {
        // Retrieve the correct service for the given item type.
        let service: { feature: Function; unfeature: Function };

        switch (type) {
            case "issue": {
                service = IssueService;
                break;
            }

            case "pull": {
                service = PullsService;
                break;
            }

            case "branch": {
                service = BranchService;
                break;
            }

            case "project": {
                service = ProjectService;
                break;
            }
        }

        // Function for featuring/unfeaturing.
        const serviceFunction = !item.featured ? service.feature : service.unfeature;

        if (confirm) {
            ModalHandler.open({
                component: ConfirmModal,
                componentPayload: {
                    message: !item.featured
                        ? "Are you sure you want to feature this item?"
                        : "Are you sure you want to unfeature this item?",
                    action: (modifications: ConfirmModalModifications) => {
                        modifications.loading = true;

                        // Feature the item.
                        serviceFunction(item.id)
                            .then(() => {
                                ModalHandler.close();

                                // Update the item.
                                item.featured = !item.featured;

                                // Success message.
                                SnackbarHandler.open({
                                    message: "Item is now featured.",
                                    color: "success"
                                });
                            })
                            .catch((error: EchoError) => {
                                ErrorHandler.handle(error, {
                                    style: "SNACKBAR"
                                });
                            })
                            .finally(() => (modifications.loading = false));
                    }
                }
            });

            return null;
        } else {
            // Feature the item.
            return serviceFunction(item.id)
                .then(() => {
                    // Update the item.
                    item.featured = !item.featured;

                    // Success message.
                    SnackbarHandler.open({
                        message: "Item is now featured.",
                        color: "success"
                    });
                })
                .catch((error: EchoError) => {
                    ErrorHandler.handle(error, {
                        style: "SNACKBAR"
                    });
                });
        }
    }
}
