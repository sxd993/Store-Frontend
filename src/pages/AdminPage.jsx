import { OrderListContainer } from "../features/admin/components/OrderListContainer.jsx"
import { ScrollToTop } from "../shared/components/ScrollToTop.jsx"

export const AdminPage = () => {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <OrderListContainer />
                
                {/* Футер с кнопкой "Скролл наверх" */}
                <footer className="mt-16 pt-8 border-t border-gray-200">
                    <ScrollToTop />
                </footer>
            </div>
        </section>
    )
}