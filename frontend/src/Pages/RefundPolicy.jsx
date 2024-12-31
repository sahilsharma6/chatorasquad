import React from 'react';

const RefundAndReturnPolicy = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-semibold text-center text-orange-600 mb-8">Refund and Returns Policy</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium text-orange-600">Introduction</h2>
            <p className="mt-4 text-lg">
              Our refund and returns policy lasts 30 days. If 30 days have passed since your purchase, we can’t offer you a full refund or exchange.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Eligibility for Returns</h2>
            <p className="mt-4 text-lg">
              To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
            </p>
            <p className="mt-4 text-lg font-semibold">Additional Non-Returnable Items:</p>
            <ul className="list-inside list-disc mt-4 text-lg">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Some health and personal care items</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">How to Complete Your Return</h2>
            <p className="mt-4 text-lg">
              To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Partial Refunds</h2>
            <p className="mt-4 text-lg">
              There are certain situations where only partial refunds are granted:
            </p>
            <ul className="list-inside list-disc mt-4 text-lg">
              <li>Book with obvious signs of use.</li>
              <li>Any item not in its original condition, is damaged or missing parts for reasons not due to our error.</li>
              <li>Any item that is returned more than 30 days after delivery.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Terms of Use</h2>
            <p className="mt-4 text-lg">
              The Site is only to be used for your personal use and information. Your use of the services and features of the Site shall be governed by these Terms and Conditions (hereinafter “Terms of Use”) along with the Privacy Policy, Shipping Policy, and Cancellation, Refund, and Return Policy (together “Policies”) as modified and amended from time to time.
            </p>
            <p className="mt-4 text-lg">
              By merely accessing or using the Site, you are acknowledging, without limitation or qualification, to be bound by these Terms of Use and the Policies, whether you have read the same or not.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Privacy Practices</h2>
            <p className="mt-4 text-lg">
              We understand the importance of safeguarding your personal information, and we have formulated a Privacy Policy to ensure that your personal information is sufficiently protected. Apart from these Terms of Use, the Privacy Policy shall also govern your visit and use of the Site.
            </p>
            <p className="mt-4 text-lg">
              Your continued use of the Site implies that you have read and accepted the Privacy Policy and agree to be bound by its terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Product & Services</h2>
            <p className="mt-4 text-lg">
              The products and services available on the Site are for your personal use only. The products or services, or samples thereof, that you receive from us shall not be sold or resold for any commercial reasons.
            </p>
            <p className="mt-4 text-lg">
              If you experience any issues with the products you received, such as side effects or the product not being suitable for you, please note that ChatoraSquad is not responsible for any such issues.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Disclaimer of Warranties and Liability</h2>
            <p className="mt-4 text-lg">
              All products and services provided on this site are on an “as is” and “as available” basis. ChatoraSquad does not guarantee that the website will always be available or that information on the site is complete, true, or accurate.
            </p>
            <p className="mt-4 text-lg">
              ChatoraSquad will not be liable for any damages or losses related to your use of the website. We do not guarantee that the website or products are free from viruses or harmful components.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Applicable Law</h2>
            <p className="mt-4 text-lg">
              This Agreement shall be governed by and interpreted in accordance with the laws of India. The place of jurisdiction shall be in Delhi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Contact Us</h2>
            <p className="mt-4 text-lg">
              If you have any questions about this Refund and Return Policy, please reach out to us:
            </p>
            <ul className="list-inside list-disc mt-4 text-lg">
              <li><strong>Email:</strong> chatorasquad@email.in</li>
              {/* <li><strong>Phone:</strong> +1 (800) 123-4567</li> */}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RefundAndReturnPolicy;
