<template>
    <div>
        <v-list v-if="repositories && repositories.length > 0">
            <v-list-item
                v-for="(repository, index) in repositories"
                :key="index"
                @click="
                    repository.data
                        ? window.open(
                              'http://github.com/zeuswpi/g2-frontend',
                              '_blank'
                          )
                        : ''
                "
            >
                <v-list-item-content>
                    <!-- Title -->
                    <v-list-item-title>
                        <!-- Loading -->
                        <template v-if="repository.loading">
                            <v-skeleton-loader type="text" />
                        </template>

                        <!-- Data -->
                        <template v-else-if="repository.data">
                            {{ repository.data.name }}
                        </template>
                    </v-list-item-title>

                    <!-- Subtitle -->
                    <v-list-item-subtitle>
                        <!-- Loading -->
                        <template v-if="repository.loading">
                            <v-skeleton-loader type="text" />
                        </template>

                        <!-- Data -->
                        <template v-else-if="repository.data">
                            https://github.com/zeuswpi/g2-frontend
                        </template>
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list>

        <v-card-text v-else class="pt-0">
            Geen repositories gevonden.
        </v-card-text>
    </div>
</template>

<script>
export default {
    name: "Repositories",

    props: {
        repositories: {
            type: Array,
            default: () => []
        }
    }
};
</script>
